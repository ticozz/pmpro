import { AuditLogs } from "@/components/admin/users/audit-logs";

export default function AuditLogsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Audit Logs</h1>
      <AuditLogs />
    </div>
  );
} 