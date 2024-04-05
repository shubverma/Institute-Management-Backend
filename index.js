import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import studentRoute from "./routes/studentRoute.js";
import courseRoute from "./routes/courseRoute.js";
import enrollmentRoute from "./routes/enrollmentRoute.js";
import feeSubmissionRoute  from "./routes/feeSubmissionRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (request, response) =>{
    console.log(request);
    return response.status(234).send('Welcome');
});

//Route for student
app.use('/students', studentRoute);

//Route for course
app.use('/courses', courseRoute);

//Route for enrollment
app.use('/enrollments', enrollmentRoute);

//Route for feeSubmission
app.use('/feeSubmissions', feeSubmissionRoute);

// Connect to MongoDB and start the server
mongoose.connect(mongoDBURL)
        .then(() => {
            console.log('App is listening to Database');
            app.listen(PORT, () =>{
                console.log('App is listening to port: ${PORT}');
            });
        })
        .catch((error) => {
            (console.log(error));
        });



