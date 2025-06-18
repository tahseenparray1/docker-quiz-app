import "./app.css";
import he from "he";
import Header from "./components/Header.jsx";
import InfoBox from "./components/InfoBox.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import InfoBottom from "./components/InfoBottom.jsx";
import QuestionBox from "./components/QuestionBox.jsx";
import Question from "./components/Question.jsx";
import Options from "./components/Options.jsx";
import Footer from "./components/Footer.jsx";
import TimeLabel from "./components/TimeLabel.jsx";
import NextButton from "./components/NextButton.jsx";

import { useEffect, useState } from "react";
import Finish from "./components/Finish.jsx";
const data = {
  response_code: 0,
  results: [
    {
      type: "multiple",
      difficulty: "medium",
      category: "Science: Computers",
      question: "What was Bitcoin&#039;s block size limit in 2010?",
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
      question: "Who invented the &quot;Spanning Tree Protocol&quot;?",
      correct_answer: "Radia Perlman",
      incorrect_answers: ["Paul Vixie", "Vint Cerf", "Michael Roberts"],
    },
    {
      type: "boolean",
      difficulty: "medium",
      category: "Science: Computers",
      question: "&quot;Windows NT&quot; is a monolithic kernel.",
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
  ],
};

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [points, setPoints] = useState(0);
  const numQuestions = questions.length;
  const [selectedOption, setSelectedOption] = useState("");
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    try {
      async function getQuestions() {
        const res = await fetch("http://localhost:8080/questions?amount=5");
        const data = await res.json();
        console.log(data);
        if (data.response_code === 0) {
          setQuestions(data.results);
        }
      }
      getQuestions();
      setStatus("ready");
    } catch (err) {
      console.log(err.message);
      setStatus("error");
    }
  }, []);
  function finishQuiz() {
    alert("quiz done");
  }
  function handleSelect(option) {
    if (!selectedOption) {
      setSelectedOption(option);
      if (option === questions[currentQuestionId].correct_answer) {
        setPoints((points) => points + 10);
      }
    }
  }
  function nextQuestion() {
    if (currentQuestionId < numQuestions - 1 && selectedOption) {
      setCurrentQuestionId((id) => id + 1);
      setSelectedOption("");
    }
  }
  return (
    <>
      {questions.length == 0 || (
        <div className="container">
          <div className="app">
            <Header />
            {status === "loading" && "Loading"}
            <InfoBox>
              <ProgressBar
                percentDone={((currentQuestionId + 1) / numQuestions) * 100}
              />
              <InfoBottom
                currentQuestion={currentQuestionId + 1}
                totalQuestions={numQuestions}
                points={points}
              />
            </InfoBox>

            <QuestionBox>
              <Question
                question={he.decode(questions[currentQuestionId].question)}
              />
              <Options
                options={[
                  ...questions[currentQuestionId].incorrect_answers,
                  questions[currentQuestionId].correct_answer,
                ]}
                correctOption={questions[currentQuestionId].correct_answer}
                handleSelect={handleSelect}
                selectedOption={selectedOption}
                key={questions[currentQuestionId].question}
              />
            </QuestionBox>

            <Footer>
              <TimeLabel />
              {currentQuestionId === numQuestions - 1 ? (
                <Finish handleClick={finishQuiz} />
              ) : (
                <NextButton handleClick={nextQuestion} />
              )}
            </Footer>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
