'use client'

import { MaintenanceList } from '@/components/maintenance/maintenance-list'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function MaintenancePage() {
  const router = useRouter()

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Maintenance</h1>
          <p className="text-gray-600">Manage maintenance requests and work orders</p>
        </div>
        <Button 
          onClick={() => router.push('/maintenance/new')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <span className="mr-2">+</span> New Work Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium">Open Requests</p>
              <h2 className="text-3xl font-bold mt-2">12</h2>
            </div>
            <span className="text-orange-500">⚠️</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Pending maintenance requests</p>
          <p className="text-sm text-gray-600">+2 from last week</p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium">In Progress</p>
              <h2 className="text-3xl font-bold mt-2">8</h2>
            </div>
            <span className="text-blue-500">🔄</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Currently being handled</p>
          <p className="text-sm text-gray-600">-1 from last week</p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium">Completed</p>
              <h2 className="text-3xl font-bold mt-2">45</h2>
            </div>
            <span className="text-green-500">✅</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">This month</p>
          <p className="text-sm text-gray-600">+12% vs last month</p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium">Emergency</p>
              <h2 className="text-3xl font-bold mt-2">2</h2>
            </div>
            <span className="text-red-500">🚨</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Require immediate attention</p>
          <p className="text-sm text-gray-600">+1 from yesterday</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search requests..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <select className="px-4 py-2 border rounded-lg">
            <option>All Status</option>
          </select>
          <select className="px-4 py-2 border rounded-lg">
            <option>All Priorities</option>
          </select>
          <select className="px-4 py-2 border rounded-lg">
            <option>All Categories</option>
          </select>
          <Button variant="outline">
            More Filters
          </Button>
          <Button variant="outline">
            Clear Filters
          </Button>
        </div>

        <MaintenanceList />
      </div>
    </div>
  )
} 