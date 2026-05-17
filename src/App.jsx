import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppProvider, useApp } from './lib/AppContext'
import { LoadingScreen } from './components/shared/UI'

// Public pages
import { HomePage, AboutPage, ServicesPage, VetsPage, BlogPage, ContactPage, BookingPage, LoginPage, RegisterPage, PortalSelectPage } from './pages/PublicPages'

// Owner dashboard
import { OwnerDashboard, OwnerPets, OwnerRecords, OwnerVaccines, OwnerAppointments, OwnerBilling } from './pages/OwnerPages'

// Vet, Receptionist, Admin
import {
  VetDashboard, VetSchedule, VetPatients,
  ReceptionDashboard, ReceptionQueue, ReceptionInvoices,
  AdminDashboard, AdminUsers, AdminPets, AdminServices, AdminSettings, AdminBlog
} from './pages/DashboardPages'

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useApp()
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

function AppRoutes() {
  const { loading } = useApp()
  if (loading) return <LoadingScreen />

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/vets" element={<VetsPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/portals" element={<PortalSelectPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Owner Dashboard */}
      <Route path="/dashboard/owner" element={<ProtectedRoute roles={['owner']}><OwnerDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/owner/pets" element={<ProtectedRoute roles={['owner']}><OwnerPets /></ProtectedRoute>} />
      <Route path="/dashboard/owner/records" element={<ProtectedRoute roles={['owner']}><OwnerRecords /></ProtectedRoute>} />
      <Route path="/dashboard/owner/vaccines" element={<ProtectedRoute roles={['owner']}><OwnerVaccines /></ProtectedRoute>} />
      <Route path="/dashboard/owner/appointments" element={<ProtectedRoute roles={['owner']}><OwnerAppointments /></ProtectedRoute>} />
      <Route path="/dashboard/owner/billing" element={<ProtectedRoute roles={['owner']}><OwnerBilling /></ProtectedRoute>} />

      {/* Vet Dashboard */}
      <Route path="/dashboard/vet" element={<ProtectedRoute roles={['vet']}><VetDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/vet/schedule" element={<ProtectedRoute roles={['vet']}><VetSchedule /></ProtectedRoute>} />
      <Route path="/dashboard/vet/patients" element={<ProtectedRoute roles={['vet']}><VetPatients /></ProtectedRoute>} />
      <Route path="/dashboard/vet/records" element={<ProtectedRoute roles={['vet']}><VetDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/vet/prescriptions" element={<ProtectedRoute roles={['vet']}><VetDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/vet/lab" element={<ProtectedRoute roles={['vet']}><VetDashboard /></ProtectedRoute>} />

      {/* Reception Dashboard */}
      <Route path="/dashboard/reception" element={<ProtectedRoute roles={['receptionist']}><ReceptionDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/reception/queue" element={<ProtectedRoute roles={['receptionist']}><ReceptionQueue /></ProtectedRoute>} />
      <Route path="/dashboard/reception/appointments" element={<ProtectedRoute roles={['receptionist']}><ReceptionDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/reception/walkins" element={<ProtectedRoute roles={['receptionist']}><ReceptionDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/reception/customers" element={<ProtectedRoute roles={['receptionist']}><ReceptionDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/reception/invoices" element={<ProtectedRoute roles={['receptionist']}><ReceptionInvoices /></ProtectedRoute>} />

      {/* Admin Dashboard */}
      <Route path="/dashboard/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/admin/users" element={<ProtectedRoute roles={['admin']}><AdminUsers /></ProtectedRoute>} />
      <Route path="/dashboard/admin/vets" element={<ProtectedRoute roles={['admin']}><AdminUsers /></ProtectedRoute>} />
      <Route path="/dashboard/admin/pets" element={<ProtectedRoute roles={['admin']}><AdminPets /></ProtectedRoute>} />
      <Route path="/dashboard/admin/appointments" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/admin/services" element={<ProtectedRoute roles={['admin']}><AdminServices /></ProtectedRoute>} />
      <Route path="/dashboard/admin/payments" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/admin/invoices" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/admin/blog" element={<ProtectedRoute roles={['admin']}><AdminBlog /></ProtectedRoute>} />
      <Route path="/dashboard/admin/settings" element={<ProtectedRoute roles={['admin']}><AdminSettings /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { background: '#1a2035', border: '1px solid rgba(255,255,255,0.08)', color: '#e8eaf6', fontFamily: 'Outfit, sans-serif', fontSize: '14px', borderRadius: '12px' },
            success: { iconTheme: { primary: '#00e5a0', secondary: '#000' } },
            error: { iconTheme: { primary: '#ff4d6d', secondary: '#fff' } },
          }}
        />
      </AppProvider>
    </BrowserRouter>
  )
}
