/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import Loader from "../Reusable/Loader";
import Button from "../Reusable/Button";
// import './styles.css'; // Import the custom styles


interface Topic {
  _id: string;
  topic: string;
}

interface Question {
  _id: string;
  question: string;
  options: string[];
  topic: {
    topic: string;
  };
  level: string;
  correctAnswer: string;
}

interface Response {
  questionId: string;
  userAns: string;
  quizId: string;
}

const QuizCreation: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [quizId, setQuizId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch topics from the backend
    axios
      .get(`https://quiz-server-optimize-2.onrender.com/api/topics/all-topics`, {
        withCredentials: true,
      })
      .then((response) => {
        setTopics(response.data.topics);
      });
  }, []);

  const toggleTopicSelection = (topicId: string) => {
    setSelectedTopics((prevSelectedTopics) =>
      prevSelectedTopics.includes(topicId)
        ? prevSelectedTopics.filter((t) => t !== topicId)
        : [...prevSelectedTopics, topicId]
    );
  };

  const getQuestions = async (quizId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://quiz-server-optimize-2.onrender.com/api/quiz/start-quiz`,
        {
          params: { quizId: quizId }, // Include quizId as a parameter
          withCredentials: true, // Include withCredentials option here
        }
      );
      setLoading(false);

      if (!response?.data.data) {
        toast.error(response?.data.message.toString(), {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return;
      }

      setQuestions(response.data.data);
      toast.success(response?.data?.message);

      return;
    } catch (error: any) {
      toast.error(error.message.toString(), {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  const saveTopics = async () => {
    try {
      // Fetch questions for the selected topics from the backend
      const response = await axios.post(
        "https://quiz-server-optimize-2.onrender.com/api/topics/save-topics",
        { topics: selectedTopics },
        {
          withCredentials: true,
        }
      );
      console.log(response?.data.data);
      // setQuestions(response.data);
      setQuizId(response?.data.data);
      await getQuestions(response?.data.data);
      return;
    } catch (error: any) {
      toast.error(error.message.toString(), {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  const submitAnswer = async (answer: string) => {
    try {
      const currentQuestion = questions[currentQuestionIndex];
      const response: Response = {
        questionId: currentQuestion._id,
        userAns: answer,
        quizId: quizId,
      };
      setResponses((prevResponses) => {
        const updatedResponses = [...prevResponses];
        const responseIndex = updatedResponses.findIndex(
          (res) => res.questionId === currentQuestion._id
        );
        if (responseIndex >= 0) {
          updatedResponses[responseIndex] = response;
        } else {
          updatedResponses.push(response);
        }
        return updatedResponses;
      });

      // Store the response in the database
      await axios.put(
        "https://quiz-server-optimize-2.onrender.com/api/quiz/save-response",
        response,
        { withCredentials: true }
      );
    } catch (error: any) {
      toast.error(error.message.toString(), {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      axios.put(
        "https://quiz-server-optimize-2.onrender.com/api/quiz/quiz-completed",
        {
          quizId: quizId,
        },
        { withCredentials: true }
      );
      navigate(`/quiz-result/${quizId}`)
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentResponse = responses.find(
    (res) => res.questionId === questions[currentQuestionIndex]._id
  );

  return (
    <Layout>
      <Loader loading={loading} />
      <div className="container mx-auto px-6 py-4 flex flex-col items-center">
        {!questions.length ? (
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center">Select Topics</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {topics.map((topic) => (
                <div
                  key={topic._id}
                  className={`p-4 rounded-lg cursor-pointer text-center ${
                    selectedTopics.includes(topic._id)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => toggleTopicSelection(topic._id)}
                >
                  {topic.topic}
                </div>
              ))}
            </div>
            <Button
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={saveTopics}
              disabled={!selectedTopics.length}
            >
              Start Quiz
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-2xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Quiz</h2>
            {questions.length > 0 && (
              <div className="flex flex-col items-center">
                <h3 className="text-2xl mb-4 text-center">
                  {questions[currentQuestionIndex].question}
                  </h3>
                  <div className="flex space-x-2">

                <p className="mb-2 text-center">
                  Topic: {questions[currentQuestionIndex].topic.topic}
                </p>
                <p className="mb-4 text-center">
                  Level: {questions[currentQuestionIndex].level}
                </p>
                  </div>
                <ul className="w-full mb-4">
                  {questions[currentQuestionIndex].options.map(
                    (option, index) => (
                      <li key={index} className="mb-2">
                        <Button
                          className={`w-full py-2 px-4 rounded ${
                            currentResponse && currentResponse.userAns === option
                              ? "bg-blue-500 text-white"
                              : "bg-slate-500"
                          }`}
                          onClick={() => submitAnswer(option)}
                        >
                          {option}
                        </Button>
                      </li>
                    )
                  )}
                </ul>
                <p className="mt-4 text-center">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                <div className="flex justify-between w-full mt-4">
                  <Button
                    className="bg-purple-300 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                  >
                    Prev
                  </Button>
                  <Button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNext}
                    disabled={!currentResponse}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default QuizCreation;
