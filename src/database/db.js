import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

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