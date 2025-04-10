'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/auth-context";
import {
  ArrowUp,
  AlertCircle,
  Home,
  Map,
  Package,
  Shield,
  Menu,
  X,
  // Search,
  Lock,
  User,
  Palette,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
  { href: "/incidents", label: "Incidents", icon: <AlertCircle className="h-5 w-5" /> },
  { href: "/resources", label: "Resources", icon: <Package className="h-5 w-5" /> },
  { href: "/response", label: "Response", icon: <Shield className="h-5 w-5" /> },
  { href: "/alerts", label: "Alerts", icon: <Map className="h-5 w-5" /> },
];

const themes = [
  { name: "Light", value: "light" },
  { name: "Dark", value: "dark" },
  { name: "Gunmetal", value: "gunmetal" },
  { name: "System", value: "system" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  const handleLogout = () => {
    logout();
    setIsAccountOpen(false);
  };

  // Effect to handle window resize and determine if the screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px is the breakpoint for `lg` in Tailwind
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect to get main element
  useEffect(() => {
    mainRef.current = document.querySelector('main');
  }, []);

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <aside className="hidden sticky lg:flex flex-col w-16 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        {/* Top 4 Logos - Sticky */}
        <div className="sticky top-0">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "flex h-16 items-center justify-center hover:bg-accent transition-colors",
              pathname === "/" && "pointer-events-none"
            )}
          >
            <Shield className="h-6 w-6" />
          </Link>

          {/* Account Button */}
          <DropdownMenu open={isAccountOpen} onOpenChange={setIsAccountOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-[72px] w-full rounded-none">
                {isAccountOpen ? (
                  <X className="h-5 w-5" /> // Show X when dropdown is open
                ) : isLoggedIn ? (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profile_picture} alt={user?.name} />
                    <AvatarFallback>{user?.name?.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                ) : (
                  <Lock className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="right" className="w-64">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 p-2 border-b">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profile_picture} alt={user?.name} />
                      <AvatarFallback>{user?.name?.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground">{user?.role}</span>
                    </div>
                  </div>
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <DropdownMenuItem className="cursor-pointer">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/register">
                    <DropdownMenuItem className="cursor-pointer">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register
                    </DropdownMenuItem>
                  </Link>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Selector */}
          <DropdownMenu open={isPaletteOpen} onOpenChange={setIsPaletteOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-[72px] w-full rounded-none">
                {isPaletteOpen ? <X className="h-5 w-5" /> : <Palette className="h-5 w-5" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="right">
              {themes.map((t) => (
                <DropdownMenuItem
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className={cn(
                    "flex items-center gap-2 cursor-pointer",
                    theme === t.value && "bg-accent"
                  )}
                >
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: t.value === 'light' ? '#fff' : t.value === 'dark' ? '#3a3939' : t.value === 'gunmetal' ? '#1a202f' : '#0a0a0a' }} />
                  {t.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Menu Button */}
          {!isMobile && (
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-[72px] w-full rounded-none">
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80" container={mainRef.current}>
                <SheetHeader className="fixed top-11">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="py-6 fixed top-16">
                  {/* <div className="mb-4">
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="h-9"
                      prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                    />
                  </div> */}
                  <nav className="space-y-2">
                    {navItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleNavigation(item.href)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                          pathname === item.href && "bg-accent"
                        )}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>

        {/* Scroll-to-Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-auto flex h-16 items-center justify-center hover:bg-accent transition-colors"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </aside>

      {/* Mobile Header */}
      {isMobile && (
        <header className="lg:hidden sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center gap-4">
            {/* Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="fixed w-full sm:w-96" container={mainRef.current}>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <div className="mb-4">
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="h-9"
                      // prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                    />
                  </div>
                  <nav className="space-y-2">
                    {navItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleNavigation(item.href)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                          pathname === item.href && "bg-accent"
                        )}
                      >
                        {item.icon}
                        {item.label}
                      </button>
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
                      <div className="h-4 w-4 rounded-full" style={{ backgroundColor: t.value === 'light' ? '#fff' : t.value === 'dark' ? '#3a3939' : t.value === 'gunmetal' ? '#1a202f' : '#0a0a0a' }} />
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
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.profile_picture} alt={user?.name} />
                        <AvatarFallback>{user?.name?.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center gap-2 p-2 border-b">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.profile_picture} alt={user?.name} />
                          <AvatarFallback>{user?.name?.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{user?.name}</span>
                          <span className="text-xs text-muted-foreground">{user?.role}</span>
                        </div>
                      </div>
                      <Link href="/profile">
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem onClick={handleLogout}>
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
      )}
    </>
  );
}