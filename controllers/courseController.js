import { Course } from "../models/courseModel.js";

export const addCourse = async (request, response) => {
    try {
        const { courseId, name, duration, fees } = request.body;

        if (!courseId || !name || !duration || !fees) {
            return response.status(400).send({ message: 'send all required fields' });
        }

        const newCourse = { courseId, name, duration, fees };
        const course = await Course.create(newCourse);

        return response.status(201).send(course);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

export const getAllCourses = async (request, response) => {
    try {
        const courses = await Course.find({});
        return response.status(200).json({ count: courses.length, data: courses });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

export const getCourseById = async (request, response) => {
    try {
        const { id } = request.params;
        const course = await Course.findById(id);

        if (!course) {
            return response.status(404).send({ message: 'Course not found' });
        }

        return response.status(200).json({ course });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

export const updateCourse = async (request, response) => {
    try {
        const { id } = request.params;
        const { courseId, name, duration, fees } = request.body;

        if (!courseId || !name || !duration || !fees) {
            return response.status(400).send({ message: 'Please provide all required fields including courseId' });
        }

        const updatedCourse = await Course.findByIdAndUpdate(id, request.body, { new: true });

        if (!updatedCourse) {
            return response.status(404).json({ message: 'Course not found' });
        }

        return response.status(200).json({ message: 'Course updated', updatedCourse });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
};

export const deleteCourse = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Course.findOneAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Course not found' });
        }

        return response.status(200).json({ message: 'Course deleted' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
};