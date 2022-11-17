import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from 'uuid';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
    await mongoClient.connect();
    } catch {
    console.log("Ocorreu um erro");
    }

    db = mongoClient.db("mywallet");

const port = 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));