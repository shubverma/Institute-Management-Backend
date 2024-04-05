import express from 'express';
import { FeeSubmission } from "../models/feeSubmissionModel.js";

const router = express.Router();

// Route to create a new fee submission
router.post("/", async (request, response) => {
    try {
        const feeSubmission = await FeeSubmission.create(request.body);
        response.status(201).json(feeSubmission);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Failed to create fee submission" });
    }
});

// Route to get all fee submissions
router.get("/", async (request, response) => {
    try {
        const feeSubmissions = await FeeSubmission.find();
        response.status(200).json(feeSubmissions);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Failed to retrieve fee submissions" });
    }
});

// Route to delete fee submissions 
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      const result = await FeeSubmission.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ message: 'FeeSubmission not found' });
      }
      
      return res.status(200).json({ message: 'FeeSubmission deleted' });
  
    } catch(error) {
      console.error(error.message);
      return res.status(500).send({ message: error.message });
    }
});

export default router;