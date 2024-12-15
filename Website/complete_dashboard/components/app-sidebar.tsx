"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Activity, AlertTriangle, Ambulance, Brain, Calendar, Heart, Home, Image, Microscope, Settings, Stethoscope, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Activity, label: 'Patient Monitoring', href: '/patient-monitoring' },
  { icon: AlertTriangle, label: 'Early Detection', href: '/early-detection' },
  { icon: Brain, label: 'Mental Health', href: '/mental-health' },
  { icon: Image, label: 'Medical Imaging', href: '/medical-imaging' },
  { icon: Users, label: 'Workload Management', href: '/workload-management' },
  // { icon: GraduationCap, label: 'Training & Education', href: '/training' },
  { icon: Ambulance, label: 'Emergency Response', href: '/emergency-response' },
  { icon: Heart, label: 'Personal Health', href: '/personal-health' },
  { icon: Calendar, label: 'Resource Allocation', href: '/resource-allocation' },
  // { icon: Eye, label: 'Diagnostic Support', href: '/diagnostic-support' },
  { icon: Microscope, label: 'Medication Management', href: '/medication-management' },
  { icon: Stethoscope, label: 'Facility Monitoring', href: '/facility-monitoring' },
  // { icon: Zap, label: 'IoT Patient Monitoring', href: '/iot-patient-monitoring' },
  // { icon: Shield, label: 'Secure EHR', href: '/secure-ehr' },
  // { icon: Trash2, label: 'Stress Detection', href: '/stress-detection' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-2xl font-bold">HealthTech Innovate</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

