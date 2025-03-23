import { Enrollment } from "../models/enrollmentModel.js";

export const createEnrollment = async (request, response) => {
    try {
        const enrollment = await Enrollment.create(request.body);
        response.status(201).json(enrollment);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Failed to create enrollment" });
    }
};

export const getAllEnrollments = async (request, response) => {
    try {
        const enrollments = await Enrollment.find();
        response.status(200).json(enrollments);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Failed to retrieve enrollments" });
    }
};