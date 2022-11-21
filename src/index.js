import express from "express";
import cors from "cors";
import joi from "joi";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"


export const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
    passwordConfirmation: joi.string().min(3).valid(joi.ref('password')).required()
})

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
})

export const transactionSchema = joi.object({
    cashValue: joi.number().required(),
    description: joi.string().min(3).required(),
    type: joi.required(),
    userId: joi.required()
})

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);

const port = 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));  