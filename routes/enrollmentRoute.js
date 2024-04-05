import express from 'express';
import { Enrollment } from "../models/enrollmentModel.js";

const router = express.Router();

// Route to create a new enrollment
router.post("/", async (request, response) => {
    try {
        const enrollment = await Enrollment.create(request.body);
        response.status(201).json(enrollment);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Failed to create enrollment" });
    }
});

// Route to get all enrollments
router.get("/", async (request, response) => {
    try {
        const enrollments = await Enrollment.find();
        response.status(200).json(enrollments);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Failed to retrieve enrollments" });
    }
});

export default router;