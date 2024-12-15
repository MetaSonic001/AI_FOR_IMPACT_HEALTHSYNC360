import Sidebar from '@/components/Sidebar'

const sidebarItems = [
  { name: 'Dashboard', href: '/paramedic/dashboard' },
  { name: 'Smart Dispatch System', href: '/paramedic/smart-dispatch' },
]

export default function ParamedicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  )
}

