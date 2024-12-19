import { UserList } from "@/components/admin/users/user-list";

export default function UsersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <UserList />
    </div>
  );
} 