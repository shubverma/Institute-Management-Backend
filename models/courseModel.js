import mongoose from "mongoose";


const courseSchema = mongoose.Schema(
    {
        courseId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        fees: {
            type: Number,
            required: true,
        },
    }
);


export const Course = mongoose.model('Course', courseSchema);