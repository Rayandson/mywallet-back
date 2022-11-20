import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import { v4 as uuidV4 } from 'uuid';
import { signUp, signIn } from "./controllers/authController.js";
import { getTransactions, makeTransaction } from "./controllers/userController.js";

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
dotenv.config();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
    await mongoClient.connect();
    db = mongoClient.db("mywallet");
    } catch {
    console.log("Ocorreu um erro");
    }

export const usersCollection = db.collection("users")
export const sessionsCollection = db.collection("sessions")
export const transactionsCollection = db.collection("transactions")
export const balancesCollection = db.collection("balances")

app.post("/sign-up", signUp)

app.post("/sign-in", signIn)

app.post("/transactions", makeTransaction)

app.get("/transactions", getTransactions)


const port = 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));