'use client'

import { PropertyList } from './property-list'
import { PropertyFilters } from './property-filters'
import { useOrganization } from '@/hooks/useOrganization'

export function PropertyListContainer() {
  const { organization } = useOrganization();

  return (
    <>
      <PropertyFilters />
      <PropertyList />
    </>
  )
} 