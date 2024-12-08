import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | PropertyPro',
  description: 'Property management dashboard',
}

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Add your dashboard content here */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">Welcome to your dashboard</p>
          </div>
        </div>
      </div>
    </div>
  )
} 