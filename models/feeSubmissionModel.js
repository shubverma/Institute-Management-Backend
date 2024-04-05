import mongoose from "mongoose";


const feeSubmissionSchema = mongoose.Schema({
    
    student: {
        type: String, 
        ref: 'Student', 
        required: true
    },
    
    submitted_Fees: {
        type: Number,
        required: true,
    },
    submission_Date: {
        type: Date,
        required: true,
    },
});

export const FeeSubmission = mongoose.model('feeSubmission', feeSubmissionSchema);
