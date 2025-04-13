import express from 'express';
const router = express.Router();

import {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    dismissEvent,
    undismissEvent,
    deleteEvent
} from '../controllers/events.js'
import { auth } from '../middleware/auth.js'

router.use(auth);

router.post('/', createEvent);

router.get('/', getEvents);
router.get('/:id', getEventById);

router.put('/:id', updateEvent);
router.put('/:id/dismiss', dismissEvent);
router.put('/:id/undismiss', undismissEvent);

router.delete('/:id', deleteEvent);

export default router;