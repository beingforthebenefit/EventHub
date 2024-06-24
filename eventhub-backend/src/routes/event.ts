import { Router } from 'express'
import { createEvent } from '../controllers/eventController'
import { authenticate } from '../middleware/authMiddleware'

const router = Router()

router.post('/create', authenticate, createEvent)

// Add more event-related routes here...

export default router