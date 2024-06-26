/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import moment from "moment"; // Import moment library for date formatting
import Loader from "../Reusable/Loader";
import { toast } from "react-toastify";

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fecthLeaderboard = async () => {
    try {
      setLoading(true)
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/quiz-users/leaderboard`, {
        withCredentials: true,
      }).then((response) => {
        setLeaderboardData(response.data.data);
      });
      setLoading(false);

      return
      
    } catch (error) {
      toast.error("Failed to get leaderboard data", {
        autoClose: 2000,
        hideProgressBar: true,
      })
      return
    }
  }

  useEffect(() => {
    // Fetch leaderboard data from the backend
    fecthLeaderboard()
    }, []);

  return (
    <Layout>
      <Loader loading={loading} />
      <div className="container mx-auto px-6 py-4">
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Topics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboardData?.map((user, index) => (
                <tr key={index} className={
                  index === 2 ? "bg-yellow-200 border-black" :
                    index === 1 ? "bg-yellow-300 border-black" :
                      index === 0 ? "bg-yellow-400 border-black":""
                    }>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.user.firstName} {user.user.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.finalScore}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.topics.map((topic: any) => topic.topic).join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{moment(user.createdAt).format("YYYY-MM-DD")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
