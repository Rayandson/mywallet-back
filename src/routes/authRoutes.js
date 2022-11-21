import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import { signInSchema } from "../middlewares/signInSchemaMiddleware.js";
import { signUpSchema } from "../middlewares/signUpSchemaMiddleware.js";

const router = Router()

router.post("/sign-up",signUpSchema, signUp)

router.post("/sign-in", signInSchema, signIn)

export default router;