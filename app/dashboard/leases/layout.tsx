import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leases",
  description: "Manage your property leases",
};

export default function LeasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 