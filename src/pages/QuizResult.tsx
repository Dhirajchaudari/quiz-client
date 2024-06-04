/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardPages } from '../interfaces';
import Layout from '../components/Layout';
import { toast } from 'react-toastify';
import Loader from '../Reusable/Loader';
import Button from '../Reusable/Button';

interface Result {
  question: {
    _id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    score: number;
  };
  response: {
    questionId: string;
    userAns: string;
  };
  isCorrect: boolean;
}

interface QuizResultData {
  user: {
    firstName: string;
    lastName: string;
  };
  topics: {
    topic: string;
  }[];
  results: Result[];
  totalScore: number;
}

const QuizResult: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [data, setData] = useState<QuizResultData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizResult = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/quiz/result`,
          {
            params: { quizId },
            withCredentials: true,
          }
        );
        console.log(response.data.data.totalScore)
        setLoading(false);
        if (response.data.success) {
          setData(response.data.data);
        } else {
          toast.error(response.data.message.toString(), {
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
      } catch (error: any) {
        setLoading(false);
        toast.error(error.message.toString(), {
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    };

    fetchQuizResult();
  }, [quizId]);

  if (loading || !data) {
    return (
      <Layout>
        <Loader loading={loading} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-4">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <div className="mb-4">
          <p>
            User: {data.user.firstName} {data.user.lastName}
          </p>
          <p>Total Score: {data.totalScore}</p>
          <p>Topics: {data.topics.map(topic => topic.topic).join(', ')}</p>
        </div>
        <div>
          {data.results.map((result, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <h3 className="text-xl mb-2">{result.question.question}</h3>
              <ul>
                {result.question.options.map((option, i) => (
                  <li
                    key={i}
                    className={`py-2 px-4 rounded ${
                      option === result.response.userAns
                        ? result.isCorrect
                          ? 'bg-green-200'
                          : 'bg-red-200'
                        : ''
                    }`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              <p className="mt-2">
                Correct Answer: {result.question.correctAnswer}
              </p>
              <p className="mt-2">Score: {result.question.score}</p>
            </div>
          ))}
        </div>
        <Button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate(DashboardPages.Dashboard)}
        >
          View Leaderboard
        </Button>
      </div>
    </Layout>
  );
};

export default QuizResult;
