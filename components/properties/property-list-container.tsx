'use client'

import { useState } from 'react'
import { PropertyList } from './property-list'
import { PropertyFilters } from './property-filters'

export function PropertyListContainer() {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid')

  return (
    <>
      <PropertyFilters viewType={viewType} onViewChange={setViewType} />
      <PropertyList viewType={viewType} />
    </>
  )
} 