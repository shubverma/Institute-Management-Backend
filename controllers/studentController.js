import { Student } from '../models/studentModel.js';
import { Enrollment } from '../models/enrollmentModel.js';

export const addStudent = async (request, response) => {
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

        if (!studentId || !studentName || !fatherName || !motherName || !doB || !phone || !address || !course || !committedFees) {
            return response.status(400).send({ message: 'Please provide all required fields including committedFees' });
        }

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

        const enrollment = await Enrollment.create({
            student: student.id,
            course,
            committedFees,
        });

        return response.status(201).send({ student, enrollment });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: 'An error occurred while processing your request' });
    }
};

export const getAllStudents = async (request, response) => {
    try {
        const students = await Student.find().populate('course');
        return response.status(200).json({ count: students.length, data: students });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

export const getStudentById = async (request, response) => {
    try {
        const { id } = request.params;
        const student = await Student.findById(id).populate('course');

        if (!student) {
            return response.status(404).send({ message: 'Student not found' });
        }

        return response.status(200).json({ student });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

export const updateStudent = async (request, response) => {
    try {
        const { id } = request.params;
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
            return response.status(400).send({ message: 'Please provide all required fields including studentId' });
        }

        const updatedStudent = await Student.findByIdAndUpdate(id, request.body, { new: true });

        if (!updatedStudent) {
            return response.status(404).json({ message: 'Student not found' });
        }

        return response.status(200).json({ message: 'Student updated', updatedStudent });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
};

export const deleteStudent = async (request, response) => {
    try {
        const { id } = request.params;
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return response.status(404).json({ message: 'Student not found' });
        }

        return response.status(200).json({ message: 'Student deleted', deletedStudent });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
};