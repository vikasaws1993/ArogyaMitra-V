import { Router } from 'express';
import {
  getAssignedPatients,
  getPatientById,
  updatePatient,
} from '../controllers/patient.controller.js';
import { verifyJWT, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

// GET /api/patients/assigned - Get all patients assigned to Arogya Sevak from Admin
router.get('/assigned', verifyJWT, authorizeRoles('ADMIN', 'AROGYA_SEVAK'), getAssignedPatients);

// GET /api/patients - Alias for assigned patients list
router.get('/', verifyJWT, authorizeRoles('ADMIN', 'AROGYA_SEVAK'), getAssignedPatients);

// GET /api/patients/:id - Get patient details by Case ID (e.g. AM-2026-00124)
router.get('/:id', verifyJWT, authorizeRoles('ADMIN', 'AROGYA_SEVAK'), getPatientById);

// PATCH /api/patients/:id - Update patient status, ward, clinical notes
router.patch('/:id', verifyJWT, authorizeRoles('ADMIN', 'AROGYA_SEVAK'), updatePatient);

// PUT /api/patients/:id - Update patient
router.put('/:id', verifyJWT, authorizeRoles('ADMIN', 'AROGYA_SEVAK'), updatePatient);

export default router;
