import express from 'express';
import {
    createFeeSubmission,
    getAllFeeSubmissions,
    deleteFeeSubmission
} from '../controllers/feeSubmissionController.js';

const router = express.Router();

router.post("/", createFeeSubmission);
router.get("/", getAllFeeSubmissions);
router.delete('/:id', deleteFeeSubmission);

export default router;