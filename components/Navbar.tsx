"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { 
  AlertCircle, 
  Home, 
  Map, 
  Package, 
  Shield, 
  Menu,
  X,
  Search,
  Lock,
  User,
  Palette,
  LogIn,
  UserPlus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
  { href: "/incidents", label: "Incidents", icon: <AlertCircle className="h-5 w-5" /> },
  { href: "/resources", label: "Resources", icon: <Package className="h-5 w-5" /> },
  { href: "/response", label: "Response", icon: <Shield className="h-5 w-5" /> },
  { href: "/alerts", label: "Alerts", icon: <Map className="h-5 w-5" /> },
]

const themes = [
  { name: "Light", value: "light" },
  { name: "Dark", value: "dark" },
  { name: "System", value: "system" }
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from auth context in real app
  const { theme, setTheme } = useTheme()
  
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[72px] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        {/* Logo */}
        <Link 
          href="/"
          className={cn(
            "flex h-[72px] items-center justify-center hover:bg-accent transition-colors",
            pathname === "/" && "pointer-events-none"
          )}
        >
          <Shield className="h-6 w-6" />
        </Link>

        {/* Account Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-[72px] w-full rounded-none">
              {isLoggedIn ? (
                <div className="h-8 w-8 rounded-full bg-primary" />
              ) : (
                <Lock className="h-5 w-5" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="right" className="w-64">
            {isLoggedIn ? (
              <>
                <Link href="/profile">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <Link href="/login">
                  <DropdownMenuItem>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </DropdownMenuItem>
                </Link>
                <Link href="/register">
                  <DropdownMenuItem>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register
                  </DropdownMenuItem>
                </Link>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-[72px] w-full rounded-none">
              <Palette className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="right">
            {themes.map((t) => (
              <DropdownMenuItem
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={cn(
                  "flex items-center gap-2",
                  theme === t.value && "bg-accent"
                )}
              >
                {t.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Menu Button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-[72px] w-full rounded-none">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <div className="mb-4">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="h-9"
                  prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                />
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                      pathname === item.href && "bg-accent"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4">
          {/* Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-96">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="py-6">
                <div className="mb-4">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="h-9"
                    prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                  />
                </div>
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                        pathname === item.href && "bg-accent"
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="font-semibold">Nepal DRS</span>
          </Link>

          <div className="flex items-center gap-2 ml-auto">
            {/* Theme Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Palette className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {themes.map((t) => (
                  <DropdownMenuItem
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    className={cn(
                      "flex items-center gap-2",
                      theme === t.value && "bg-accent"
                    )}
                  >
                    {t.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Account Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {isLoggedIn ? (
                    <div className="h-8 w-8 rounded-full bg-primary" />
                  ) : (
                    <Lock className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                {isLoggedIn ? (
                  <>
                    <Link href="/profile">
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      <LogIn className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <DropdownMenuItem>
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/register">
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Register
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  )
}