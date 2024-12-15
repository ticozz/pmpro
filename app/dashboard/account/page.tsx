import { Metadata } from "next";
import { AccountDetails } from "@/components/account/account-details";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings",
};

export default function AccountPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
      </div>
      <div className="grid gap-4">
        <AccountDetails />
      </div>
    </div>
  );
}