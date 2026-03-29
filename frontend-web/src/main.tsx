import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Parcelas from './pages/Parcelas'
import Productos from './pages/Productos'
import Ventas from './pages/Ventas'
import Fichajes from './pages/Fichajes'
import Alquileres from './pages/Alquileres'
import Aportaciones from './pages/Aportaciones'
import Sensores from './pages/Sensores'
import Mensajes from './pages/Mensajes'
import PlanesAccion from './pages/PlanesAccion'
import './index.css'

const queryClient = new QueryClient()

function RutaProtegida({ children }: { children: React.ReactNode }) {
  const { usuario, cargando } = useAuth()
  if (cargando) return <div className="min-h-screen bg-[#1c2b1a] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
  </div>
  if (!usuario) return <Navigate to="/login" replace />
  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <RutaProtegida>
            <Dashboard />
          </RutaProtegida>
        } />
        <Route path="/parcelas" element={
          <RutaProtegida>
            <Parcelas />
          </RutaProtegida>
        } />
        <Route path="/productos" element={
          <RutaProtegida>
            <Productos />
          </RutaProtegida>
        } />
        <Route path="/ventas" element={
          <RutaProtegida>
            <Ventas />
          </RutaProtegida>
        } />
        <Route path="/fichajes" element={
          <RutaProtegida>
            <Fichajes />
          </RutaProtegida>
        } />
        <Route path="/alquileres" element={
          <RutaProtegida>
            <Alquileres />
          </RutaProtegida>
        } />
        <Route path="/aportaciones" element={
          <RutaProtegida>
            <Aportaciones />
          </RutaProtegida>
        } />
        <Route path="/sensores" element={
          <RutaProtegida>
            <Sensores />
          </RutaProtegida>
        } />
        <Route path="/mensajes" element={
          <RutaProtegida>
            <Mensajes />
          </RutaProtegida>
        } />
        <Route path="/planes_accion" element={
          <RutaProtegida>
            <PlanesAccion />
          </RutaProtegida>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)