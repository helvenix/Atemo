const express = require('express');
const router = express.Router();

import {
    registerUser,
    loginUser,
    getMyProfile,
    updateMyProfile,
    getUserProfile
} from '../controllers/users'

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', getMyProfile);
router.post('/me', updateMyProfile);

router.get('/:id', getUserProfile);