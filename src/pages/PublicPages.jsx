/**
 * PublicPages.jsx
 * Barrel re-export — App.jsx imports stay unchanged.
 * Individual pages live in ./public/
 */
export {
  HomePage, AboutPage, ServicesPage, VetsPage,
  BlogPage, BlogDetailPage, ContactPage, BookingPage,
  LoginPage, RegisterPage,
} from './public'

// Compatibility shim for <Route path="/portals">
import { Navigate } from 'react-router-dom'
export function PortalSelectPage() { return <Navigate to="/login" replace /> }
