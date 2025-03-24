import { FeeSubmission } from "../models/feeSubmissionModel.js";

export const createFeeSubmission = async (request, response) => {
    try {
        const feeSubmission = await FeeSubmission.create(request.body);
        response.status(201).json(feeSubmission);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Failed to create fee submission" });
    }
};

export const getAllFeeSubmissions = async (request, response) => {
    try {
        const feeSubmissions = await FeeSubmission.find().populate('student');
        response.status(200).json(feeSubmissions);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Failed to retrieve fee submissions" });
    }
};

export const deleteFeeSubmission = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await FeeSubmission.findByIdAndDelete(id);
    
        if (!result) {
          return response.status(404).json({ message: 'FeeSubmission not found' });
        }
        
        return response.status(200).json({ message: 'FeeSubmission deleted' });
    
      } catch(error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
      }
};