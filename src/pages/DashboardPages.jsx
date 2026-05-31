/**
 * DashboardPages.jsx
 * Barrel re-export — App.jsx imports stay unchanged.
 * Role pages live in ./vet/ ./reception/ ./admin/
 */
export { VetDashboard, VetSchedule, VetPatients }              from './vet'
export { ReceptionDashboard, ReceptionQueue, ReceptionInvoices } from './reception'
export { AdminDashboard }                                        from './admin'
export { AdminUsers, AdminPets }                                 from './admin'
export { AdminServices, AdminSettings, AdminBlog }               from './admin'
