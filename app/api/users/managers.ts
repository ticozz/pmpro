import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Replace this with your actual data fetching logic
    const managers = [
      { id: "1", name: "Manager One" },
      { id: "2", name: "Manager Two" },
    ];
    res.status(200).json(managers);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
