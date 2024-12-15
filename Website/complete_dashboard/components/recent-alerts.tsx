import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentAlerts() {
  const alerts = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      avatarSrc: "/avatars/01.png",
      alert: "Critical patient in Room 302",
    },
    {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      avatarSrc: "/avatars/02.png",
      alert: "Equipment malfunction in ICU",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      avatarSrc: "/avatars/03.png",
      alert: "Medication shortage alert",
    },
    {
      name: "William Kim",
      email: "will@email.com",
      avatarSrc: "/avatars/04.png",
      alert: "New patient admitted to ER",
    },
  ]

  return (
    <div className="space-y-8">
      {alerts.map((alert) => (
        <div key={alert.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={alert.avatarSrc} alt="Avatar" />
            <AvatarFallback>{alert.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{alert.name}</p>
            <p className="text-sm text-muted-foreground">{alert.alert}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

