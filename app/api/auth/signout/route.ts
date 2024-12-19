import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function POST() {
  const session = await getServerSession(authOptions);
  const response = NextResponse.json({ success: true });

  // Clear all possible session cookies
  response.cookies.delete("next-auth.session-token");
  response.cookies.delete("__Secure-next-auth.session-token");
  response.cookies.delete("next-auth.callback-url");
  response.cookies.delete("next-auth.csrf-token");
  response.cookies.delete("__Host-next-auth.csrf-token");

  // Set expired cookies as fallback
  const expires = new Date(0).toUTCString();
  const cookies = [
    `next-auth.session-token=; Path=/; Expires=${expires}; HttpOnly`,
    `__Secure-next-auth.session-token=; Path=/; Expires=${expires}; HttpOnly; Secure`,
  ].join(", ");

  response.headers.set("Set-Cookie", cookies);

  return response;
}
