import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Question from "./models/question.js";

const app = express();
app.use(cors());
const initialQuestions = [
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: "What was Bitcoin's block size limit in 2010?",
    correct_answer: "1 MB",
    incorrect_answers: ["1GB", "1 KB", "1 TB"],
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "Science: Computers",
    question: "The HTML5 standard was published in 2014.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question: 'Who invented the "Spanning Tree Protocol"?',
    correct_answer: "Radia Perlman",
    incorrect_answers: ["Paul Vixie", "Vint Cerf", "Michael Roberts"],
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "Science: Computers",
    question: '"Windows NT" is a monolithic kernel.',
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question: "Linus Torvalds created Linux and Git.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "Science: Computers",
    question:
      "Early RAM was directly seated onto the motherboard and could not be easily removed.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "What amount of bits commonly equals one byte?",
    correct_answer: "8",
    incorrect_answers: ["1", "2", "64"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "What is the name of Layer 7 of the OSI model?",
    correct_answer: "Application",
    incorrect_answers: ["Session", "Network", "Present"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question:
      "Which programming language was developed by Sun Microsystems in 1995?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "Solaris OS", "C++"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question:
      "The teapot often seen in many 3D modeling applications is called what?",
    correct_answer: "Utah Teapot",
    incorrect_answers: ["Pixar Teapot", "3D Teapot", "Tennessee Teapot"],
  },
];

async function fillDatabase() {
  try {
    const questionCount = await Question.countDocuments();
    if (questionCount === 0) {
      await Question.insertMany(initialQuestions);
    }
  } catch (err) {
    console.log(err.message);
  }
}

app.get("/questions", async (req, res) => {
  const requestedAmount = parseInt(req.query.amount) || 10;
  try {
    const questions = await Question.aggregate([
      { $sample: { size: requestedAmount } },
    ]);
    res.status(200).json({
      response_code: 0,
      results: questions,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch questions." });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await fillDatabase();
    app.listen(3000);
  } catch (err) {
    console.log(err.message);
  }
}

startServer();
