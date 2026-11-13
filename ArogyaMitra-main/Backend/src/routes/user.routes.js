import { Router } from 'express';
import {
  createUser,
  getUserById,
  getUserByMobile,
} from '../controllers/user.controller.js';
import { verifyJWT, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

// POST /api/users - Store a new user (ADMIN only)
router.post('/', verifyJWT, authorizeRoles('ADMIN'), createUser);

// GET /api/users/mobile/:mobile - Find user by mobile number (ADMIN only)
router.get('/mobile/:mobile', verifyJWT, authorizeRoles('ADMIN'), getUserByMobile);

// GET /api/users/:id - Find user by UUID (ADMIN only)
router.get('/:id', verifyJWT, authorizeRoles('ADMIN'), getUserById);

export default router;
