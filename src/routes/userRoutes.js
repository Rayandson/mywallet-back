import { getTransactions, makeTransaction } from "../controllers/userController.js";
import { Router } from "express";

const router = Router()

router.post("/transactions", makeTransaction)

router.get("/transactions", getTransactions)

export default router;