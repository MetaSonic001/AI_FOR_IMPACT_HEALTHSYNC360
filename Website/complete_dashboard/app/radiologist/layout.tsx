import Sidebar from '@/components/Sidebar'

const sidebarItems = [
  { name: 'Dashboard', href: '/radiologist/dashboard' },
  { name: 'AI Imaging Analysis', href: '/radiologist/ai-imaging-analysis' },
  { name: 'Image Archive', href: '/radiologist/image-achive' },
  { name: 'Automated Prioritization', href: '/radiologist/auto-prioritization' },
  { name: 'Peer Review Platform', href: '/radiologist/peer-review-platform' },
]

export default function RadiologistLayout({
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

