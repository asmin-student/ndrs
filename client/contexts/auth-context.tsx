"use client";

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/lib/api"

type User = {
  id: string
  name: string
  email: string
  role: string
  organization: string | null
  district: string
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const formatRole = (role: string) => {
  return role
    .split('_')
    .map(word => {
      // Handle special cases
      if (word.toLowerCase() === 'ngo') return 'NGO'
      // Capitalize first letter for other words
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check for existing auth on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setUser(JSON.parse(userData))
      setIsLoggedIn(true)
    }
  }, [])

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await login({ email, password })
      
      if (response.status === "success" && response.data.token && response.data.user) {
        // Format the user data with proper role formatting
        const formattedUser = {
          ...response.data.user,
          role: formatRole(response.data.user.role)
        }

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(formattedUser))
        
        setUser(formattedUser)
        setIsLoggedIn(true)

        return { ...response.data, user: formattedUser }
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setIsLoggedIn(false)
    router.push('/login')
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoggedIn, 
        login: loginUser, 
        logout: logoutUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}