import express from 'express';
const router = express.Router();

import {
    registerUser,
    loginUser,
    logoutUser,
    getMyProfile,
    updateMyProfile,
    getUserProfile
} from '../controllers/users.js'
import { auth } from '../middleware/auth.js'

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/me', auth, getMyProfile);
router.put('/me', auth, updateMyProfile);

router.get('/:id', getUserProfile);

export default router;