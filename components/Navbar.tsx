"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlertCircle, Home, Map, Package, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  const pathname = usePathname()
  
  const navItems = [
    { href: "/", label: "Home", icon: <Home className="mr-2 h-4 w-4" /> },
    { href: "/incidents", label: "Incidents", icon: <AlertCircle className="mr-2 h-4 w-4" /> },
    { href: "/resources", label: "Resources", icon: <Package className="mr-2 h-4 w-4" /> },
    { href: "/response", label: "Response", icon: <Shield className="mr-2 h-4 w-4" /> },
    { href: "/alerts", label: "Alerts", icon: <Map className="mr-2 h-4 w-4" /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <span className="text-lg font-bold">Nepal DRS</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "default" : "ghost"}
              asChild
              className="flex items-center"
            >
              <Link href={item.href}>
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">
              <User className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}