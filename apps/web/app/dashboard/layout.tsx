import { ClientDashboardLayout } from '@/components/dashboard/common/client-dashboard-layout'
import React from 'react'

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
