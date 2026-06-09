import React from 'react'
import { ClientDashboardLayout } from '@/components/dashboard/client-dashboard-layout'

export const metadata = {
  title: "Dashboard | Biolynq",
  description: "Your personalized dashboard for managing your online presence and social links.",
}

export default function layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientDashboardLayout>
      {children}
    </ClientDashboardLayout>
  )
}
