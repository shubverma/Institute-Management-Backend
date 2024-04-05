import mongoose from "mongoose";

const enrollmentSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', 
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', 
        required: true
    },
    committedFees: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        maxlength: 255
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
