'use client'

import { createContext, useContext, useState } from 'react'

interface SidebarContextType {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const SidebarContext = createContext<SidebarContextType | null>(null)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SidebarContext.Provider value={{
      isOpen,
      onOpen: () => setIsOpen(true),
      onClose: () => setIsOpen(false)
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) throw new Error('useSidebar must be used within SidebarProvider')
  return context
} 