import { Router } from 'express';
import {
  getDoctors,
  getDoctorStats,
  getDoctorById,
  createDoctor,
  updateDoctor,
  updateDoctorAvailability,
  toggleDoctorActive,
  deleteDoctor,
} from '../controllers/doctor.controller.js';
import { verifyJWT, optionalJWT, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

// ==========================================
// 1) Read / Query Endpoints
// ==========================================

// GET /api/doctors - List doctors with filters and search
router.get('/', optionalJWT, getDoctors);

// GET /api/doctors/stats - Get dynamic roster metric counts
router.get('/stats', optionalJWT, getDoctorStats);

// GET /api/doctors/:id - Get doctor details by ID
router.get('/:id', optionalJWT, getDoctorById);


// ==========================================
// 2) Write / Mutation Endpoints (Protected)
// ==========================================

// Apply JWT authentication & role authorization for roster management
router.use(verifyJWT);
router.use(authorizeRoles('ADMIN', 'AROGYA_SEVAK', 'SEVAK'));

// POST /api/doctors - Register / add a new doctor
router.post('/', verifyJWT, authorizeRoles('ADMIN'), createDoctor);

// PUT /api/doctors/:id - Update full doctor details & schedule
router.put('/:id', verifyJWT, authorizeRoles('ADMIN'), updateDoctor);

// PATCH /api/doctors/:id/availability - Quick 1-click live availability update
router.patch('/:id/availability', verifyJWT, updateDoctorAvailability);

// PATCH /api/doctors/:id/toggle-status - Toggle active/deactivated status
router.patch('/:id/toggle-status', verifyJWT, authorizeRoles('ADMIN'), toggleDoctorActive);

// DELETE /api/doctors/:id - Delete doctor record
router.delete('/:id', verifyJWT, authorizeRoles('ADMIN'), deleteDoctor);

export default router;
