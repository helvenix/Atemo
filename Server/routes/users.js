import express from 'express';
const router = express.Router();

import {
    registerUser,
    loginUser,
    getMyProfile,
    updateMyProfile,
    getUserProfile
} from '../controllers/users.js'
import { auth } from '../middleware/auth.js'

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', authMiddleware, getMyProfile);
router.put('/me', authMiddleware, updateMyProfile);

router.get('/:id', getUserProfile);

export default router;