import { createContext, useContext, useState, useEffect } from 'react'
import axiosClient from '../utils/axiosClient'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('access_token')
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await axiosClient.get('/api/user/')
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axiosClient.post('/api/login/', { email, password })
      const { user, tokens } = response.data
      
      localStorage.setItem('access_token', tokens.access)
      localStorage.setItem('refresh_token', tokens.refresh)
      setUser(user)
      
      return { success: true }
    } catch (error) {
      // Handle different error formats from Django REST Framework
      const errorData = error.response?.data
      let errorMessage = 'Login failed'
      
      if (errorData) {
        if (errorData.errors) {
          const errorFields = Object.keys(errorData.errors)
          errorMessage = errorFields.map(field => {
            const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')
            return `${fieldName}: ${errorData.errors[field]}`
          }).join(', ')
        }
        else if (errorData.message) {
          errorMessage = errorData.message
        }
        else if (errorData.non_field_errors) {
          errorMessage = Array.isArray(errorData.non_field_errors) 
            ? errorData.non_field_errors[0] 
            : errorData.non_field_errors
        }
        else {
          const firstError = Object.values(errorData)[0]
          if (Array.isArray(firstError)) {
            errorMessage = firstError[0]
          } else if (typeof firstError === 'string') {
            errorMessage = firstError
          }
        }
      }
      
      return {
        success: false,
        error: errorMessage
      }
    }
  }

  const signup = async (userData) => {
    try {
      const response = await axiosClient.post('/api/register/', userData)
      const { user, tokens } = response.data
      
      localStorage.setItem('access_token', tokens.access)
      localStorage.setItem('refresh_token', tokens.refresh)
      setUser(user)
      
      return { success: true }
    } catch (error) {
      // Handle different error formats from Django REST Framework
      const errorData = error.response?.data
      let errorMessage = 'Registration failed'
      
      if (errorData) {
        // Check for formatted errors object
        if (errorData.errors) {
          const errorFields = Object.keys(errorData.errors)
          errorMessage = errorFields.map(field => {
            const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')
            return `${fieldName}: ${errorData.errors[field]}`
          }).join(', ')
        }
        // Check for direct error messages
        else if (errorData.message) {
          errorMessage = errorData.message
        }
        // Check for non_field_errors
        else if (errorData.non_field_errors) {
          errorMessage = Array.isArray(errorData.non_field_errors) 
            ? errorData.non_field_errors[0] 
            : errorData.non_field_errors
        }
        // Check for field-specific errors (Django default format)
        else {
          const firstError = Object.values(errorData)[0]
          if (Array.isArray(firstError)) {
            errorMessage = firstError[0]
          } else if (typeof firstError === 'string') {
            errorMessage = firstError
          }
        }
      }
      
      return {
        success: false,
        error: errorMessage
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    fetchUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

