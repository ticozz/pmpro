import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tenants",
  description: "Manage your property tenants",
};

export default function TenantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 