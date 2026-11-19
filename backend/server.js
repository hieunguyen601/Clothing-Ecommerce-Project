import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./Model/User.js";
import authMiddleware from "./authMiddleware.js";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Required filling information",
      });
    }


    const saltRounds = 12;
    const hashed_Password = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      password: hashed_Password,
    });

    res.status(201).json({
      message: "Signed up account successfully!",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid email or password.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password.",
      });
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return res.status(404).json({
        message: "Invalid email or password.",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "6h" },
    );

    res.status(200).json({
      message: "Signed in successfully!",
      data: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});


async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB server.");
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();
