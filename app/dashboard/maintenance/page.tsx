'use client';

import { MaintenanceList } from '@/components/maintenance/maintenance-list'
import { MaintenanceFilters } from '@/components/maintenance/maintenance-filters'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { designSystem } from '@/lib/design-system'
import { cn } from '@/lib/utils'
import { AlertTriangle, RotateCw, CheckCircle2, AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

const stats = [
  {
    label: 'Open Requests',
    value: '12',
    change: '+2 from last week',
    description: 'Pending maintenance requests',
    icon: AlertTriangle,
    iconColor: 'text-orange-500',
  },
  {
    label: 'In Progress',
    value: '8',
    change: '-1 from last week',
    description: 'Currently being handled',
    icon: RotateCw,
    iconColor: 'text-blue-500',
  },
  {
    label: 'Completed',
    value: '45',
    change: '+12% vs last month',
    description: 'This month',
    icon: CheckCircle2,
    iconColor: 'text-green-500',
  },
  {
    label: 'Emergency',
    value: '2',
    change: '+1 from yesterday',
    description: 'Require immediate attention',
    icon: AlertCircle,
    iconColor: 'text-red-500',
  },
]

export default function MaintenancePage() {
  const router = useRouter()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch('/api/properties')
        if (!response.ok) throw new Error('Failed to fetch properties')
        const data = await response.json()
        setProperties(data)
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={cn(
            "text-2xl font-bold",
            designSystem.colors.text.primary
          )}>
            Maintenance
          </h1>
          <p className={designSystem.colors.text.secondary}>
            Manage maintenance requests and work orders
          </p>
        </div>
        <Button 
          onClick={() => router.push('/maintenance/new')}
          className={cn(
            "gap-2",
            designSystem.colors.primary.gradient,
            "text-white hover:opacity-90"
          )}
        >
          <span>+</span> New Work Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div 
            key={stat.label}
            className={cn(
              designSystem.effects.card,
              "p-4 hover:shadow-md transition-all duration-200"
            )}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className={cn(
                  "text-sm font-medium",
                  designSystem.colors.text.primary
                )}>
                  {stat.label}
                </p>
                <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
              </div>
              <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
            </div>
            <p className={cn(
              "text-sm mt-2",
              designSystem.colors.text.secondary
            )}>
              {stat.description}
            </p>
            <p className={cn(
              "text-sm",
              designSystem.colors.text.muted
            )}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <MaintenanceFilters />

      <div className={cn(
        designSystem.effects.card,
        "p-6"
      )}>
        {properties.length > 0 ? (
          <MaintenanceList property={properties[0]} />
        ) : (
          <div>No properties found</div>
        )}
      </div>
    </div>
  )
} 