import { getTransactions, makeTransaction } from "../controllers/userController.js";
import { Router } from "express";
import { validateToken} from "../middlewares/validateTokenMiddleware.js"

const router = Router()
router.use(validateToken)

router.post("/transactions", makeTransaction)

router.get("/transactions", getTransactions)

export default router;