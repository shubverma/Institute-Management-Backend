import mongoose from "mongoose";


const feeSubmissionSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
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
