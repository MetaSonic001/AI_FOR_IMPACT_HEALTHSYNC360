import Sidebar from '@/components/Sidebar'

const sidebarItems = [
  { name: 'Dashboard', href: '/nurse/dashboard' },
  { name: 'Patient Monitoring', href: '/nurse/patient-monitoring' },
  { name: 'Inventory Tracking', href: '/nurse/inventory-tracking' },
  { name: 'Workflow Optimizer', href: '/nurse/workflow-optimizer' },
  { name: 'Rounding Assistant', href: '/nurse/rounding-assistant' },
  { name: 'Wound Care Monitor', href: '/nurse/wound-care' },
  { name: 'Shift Fatigue Monitor', href: '/nurse/shift-fatigue' },
  { name: 'IV Fluid Monitor', href: '/nurse/iv-fluid' },
  { name: 'Medication Administration Assistant', href: '/nurse/medication-assistant' },
  { name: 'Teleconsultation', href: '/nurse/teleconsultation' },
]

export default function NurseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  )
}

