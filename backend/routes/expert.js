import express from 'express';
import {
  getAllExperts,
  getExpertById,
  createExpert,
  updateExpert,
  deleteExpert,
} from '../controllers/expertController.js';

const router = express.Router();

// Routes for /api/experts
router.route('/').get(getAllExperts).post(createExpert);

router.route('/:id').get(getExpertById).put(updateExpert).delete(deleteExpert);

export default router;
