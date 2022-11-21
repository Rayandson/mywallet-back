import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"


const app = express();
app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));    