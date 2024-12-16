"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Lock, User } from 'lucide-react'

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Hospital-themed background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
          filter: 'brightness(0.6) blur(4px)'
        }}
      />
      
      <Card 
        className="relative z-10 w-full max-w-md shadow-2xl backdrop-blur-md bg-black/50"
        style={{
          borderColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
        }}
      >
        <CardHeader className="text-center">
          {/* <div className="flex justify-center mb-4">
            <img 
              src="/api/placeholder/100/100" 
              alt="CareSync360 Logo" 
              className="w-20 h-20 rounded-full border-4 border-white/30"
            />
          </div> */}
          <CardTitle className="text-2xl font-bold text-white">
            CareSync360
          </CardTitle>
          <CardDescription className="text-sm text-gray-300">
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label 
                htmlFor="username" 
                className="flex items-center mb-2 text-gray-200"
              >
                <User className="mr-2 h-4 w-4" />
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <Label 
                htmlFor="password" 
                className="flex items-center mb-2 text-gray-200"
              >
                <Lock className="mr-2 h-4 w-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
            {error && (
              <div className="text-sm text-center text-red-400">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Log in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center justify-center text-sm text-gray-400">
          © 2024 CareSync360. All rights reserved.
        </CardFooter>
      </Card>
    </div>
  )
}

