import express from 'express';
const router = express.Router();

import {
    registerUser,
    loginUser,
    getMyProfile,
    updateMyProfile,
    getUserProfile
} from '../controllers/users.js'

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', getMyProfile);
router.post('/me', updateMyProfile);

router.get('/:id', getUserProfile);

export default router;