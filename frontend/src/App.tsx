import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import BudgetVsActuals from './pages/BudgetVsActuals'
import Upload from './pages/Upload'
import ProtectedRoute from './components/ProtectedRoute'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/budget" element={<BudgetVsActuals />} />
            <Route path="/upload" element={<Upload />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App
