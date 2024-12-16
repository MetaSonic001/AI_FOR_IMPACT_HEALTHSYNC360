'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Brain, MessageCircle, Activity, User, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

const users = [
  { username: 'doctor', password: 'doc123', role: 'doctor' },
  { username: 'nurse', password: 'nurse123', role: 'nurse' },
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'mentalhealth', password: 'mh123', role: 'mentalhealth' },
  { username: 'radiologist', password: 'rad123', role: 'radiologist' },
  { username: 'paramedic', password: 'para123', role: 'paramedic' },
]

export default function LandingPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
      router.push(`/${user.role}/dashboard`)
    } else {
      setError('Invalid username or password')
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', { name, email, message })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFFF2] to-[#FFF9E6] relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
          alt="Hospital Background"
          className="w-full h-full object-cover opacity-5"
        />
      </div>

      {/* Hero Section with Login */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 z-10">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-20">
          <div className="text-center lg:text-left lg:w-1/2 mb-8 lg:mb-0 backdrop-blur-sm bg-white/30 p-8 rounded-lg">
            <h1 className="text-5xl font-bold mb-4 text-[#222222]">Empowering Healthcare Professionals</h1>
            <p className="text-xl mb-8 text-[#0E7C7B]">Streamline patient care with CareSync360</p>
          </div>
          <Card 
            className="w-full max-w-md shadow-2xl bg-white/10 backdrop-blur-md border-white/20"
          >
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-[#1EA896]">
                CareSync360 Login
              </CardTitle>
              <CardDescription className="text-sm text-[#0E7C7B]">
                Enter your credentials to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label 
                    htmlFor="username" 
                    className="flex items-center mb-2 text-[#0E7C7B]"
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
                    className="w-full bg-white/30 border-white/30 text-[#222222] placeholder-[#0E7C7B]/50"
                  />
                </div>
                <div>
                  <Label 
                    htmlFor="password" 
                    className="flex items-center mb-2 text-[#0E7C7B]"
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
                    className="w-full bg-white/30 border-white/30 text-[#222222] placeholder-[#0E7C7B]/50"
                  />
                </div>
                {error && (
                  <div className="text-sm text-center text-[#FF715B]">
                    {error}
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-[#FF715B] hover:bg-[#FFAD05] text-white transition-colors duration-300"
                >
                  Log in
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center justify-center text-sm text-[#0E7C7B]">
              © 2024 CareSync360. All rights reserved.
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* About the Project */}
      <section className="py-16 bg-[#FFFFF2]/70 backdrop-blur-sm relative z-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12 text-[#1EA896]">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Real-Time Monitoring', icon: Activity, description: 'Track patient vitals and status in real-time' },
              { title: 'AI Diagnostics', icon: Brain, description: 'Leverage AI for faster and more accurate diagnoses' },
              { title: 'Secure Communication', icon: MessageCircle, description: 'Collaborate securely with your healthcare team' },
            ].map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#FF715B] rounded-full flex items-center justify-center mb-4 mx-auto">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-center text-[#222222]">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-[#918868]">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 bg-[#FFF9E6]/70 backdrop-blur-sm relative z-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12 text-[#1EA896]">About Us</h2>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-gray-700 mb-4">
              At CareSync360, our mission is to revolutionize healthcare by providing cutting-edge tools that empower professionals and improve patient outcomes.
            </p>
            <p className="text-gray-600">
              We envision a future where technology seamlessly integrates with healthcare, making it more efficient, accurate, and accessible for all.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Shaun Mendes', role: 'Team Member' },
              { name: 'Sharian Dabre', role: 'Team Member' },
              { name: 'Susan Fernandes', role: 'Team Member' },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-[#343535] border-4 border-[#FF715B] mb-4 overflow-hidden">
                  <User className="w-full h-full text-white p-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="py-16 relative z-10">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Contact Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto max-w-md relative z-20">
          <h2 className="text-3xl font-semibold text-center mb-8 text-[#FF715B]">Contact Us</h2>
          <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-lg">
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/50 border-gray-300 text-gray-800"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/50 border-gray-300 text-gray-800"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-700">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-white/50 border-gray-300 text-gray-800"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#FF715B] hover:bg-[#FFAD05] text-white transition-colors duration-300"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#FFF9E6]/70 backdrop-blur-sm py-8 relative z-10">
        <div className="container mx-auto text-center">
          <p className="text-gray-600 mb-4">&copy; 2024 CareSync360. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#" className="text-[#1EA896] hover:text-[#FF715B] transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-[#1EA896] hover:text-[#FF715B] transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-[#1EA896] hover:text-[#FF715B] transition-colors duration-300">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

