import express from 'express';
import { Student } from '../models/studentModel.js';
import { Enrollment } from '../models/enrollmentModel.js';

const router = express.Router();

//Route to add a new Student
router.post('/', async (request, response) => {
    try {
        const {
            studentId,
            studentName,
            fatherName,
            motherName,
            doB,
            phone,
            address,
            course,
            committedFees
        } = request.body;

        // Check if all required fields are provided
        if (!studentId || !studentName || !fatherName || !motherName || !doB || !phone || !address || !course || !committedFees) {
            return response.status(400).send({
                message: 'Please provide all required fields including committedFees'
            });
        }

        // Create student
        const student = await Student.create({
            studentId,
            studentName,
            fatherName,
            motherName,
            doB,
            phone,
            address,
            course,
        });

        // Create enrollment
        const enrollment = await Enrollment.create({
            student: student.id, 
            course,
            committedFees,
        });

        return response.status(201).send({ student, enrollment });
    } catch(error) {
        console.error(error.message);
        response.status(500).send({ message: 'An error occurred while processing your request' });
    }
});


// Route for Get All Students from database
router.get('/', async (request, response) => {
    try {
        // Find all students and populate the 'course' field with the entire 'Course' object
        const students = await Student.find().populate('course');
        
        return response.status(200).json({
            count: students.length,
            data: students
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get One Student from database
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        // Find the student by ID and populate the 'course' field with the entire 'Course' object
        const student = await Student.findById(id).populate('course');

        if (!student) {
            return response.status(404).send({ message: 'Student not found' });
        }

        return response.status(200).json({ student });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to Update a Student Data
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params; // Change parameter name to 'id'
        const {
            studentId,
            studentName,
            fatherName,
            motherName,
            doB,
            phone,
            address,
            course,
        } = request.body;

        if (!studentId || !studentName || !fatherName || !motherName || !doB || !phone || !address || !course) {
            return response.status(400).send({
                message: 'Please provide all required fields including studentId'
            });
        }

        const updatedStudent = await Student.findByIdAndUpdate(id, request.body, { new: true }); // Use 'id' as the parameter

        if (!updatedStudent) {
            return response.status(404).json({ message: 'Student not found' });
        }
        
        return response.status(200).json({ message: 'Student updated', updatedStudent });

    } catch(error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route to delete student data
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return response.status(404).json({ message: 'Student not found' });
        }
        
        return response.status(200).json({ message: 'Student deleted', deletedStudent });

    } catch(error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;