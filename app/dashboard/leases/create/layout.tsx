import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Lease",
  description: "Create a new property lease",
};

export default function CreateLeaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 