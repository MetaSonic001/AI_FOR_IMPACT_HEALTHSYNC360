"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { useState } from 'react'


const users = [
  { username: 'doctor', password: 'doc123', role: 'doctor' },
  { username: 'nurse', password: 'nurse123', role: 'nurse' },
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'mentalhealth', password: 'mh123', role: 'mentalhealth' },
  { username: 'radiologist', password: 'rad123', role: 'radiologist' },
  { username: 'paramedic', password: 'para123', role: 'paramedic' },
]

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
      router.push(`/${user.role}/dashboard`)
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login to CareSync360</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">Log in</Button>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

