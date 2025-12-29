import { Navigate, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const fetchAuth = async () => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('No token')
  
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Invalid token')
  return res.json()
}

export default function ProtectedRoute() {
  const { isLoading, isError } = useQuery({
    queryKey: ['auth'],
    queryFn: fetchAuth,
    retry: false,
  })

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (isError) return <Navigate to="/login" replace />

  return <Outlet />
}
