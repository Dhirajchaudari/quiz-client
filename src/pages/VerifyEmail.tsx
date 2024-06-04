/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../Reusable/Loader";
import { DashboardPages } from "../interfaces";

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"success" | "failed">("success");
  const [message, setMessage] = useState<string>("Verifying your email...");
  const [loading, setLoading] = useState<boolean>(false)

  const verifyEmail = async () => {
    try {

      if (!token) {
        setLoading(true);
        return;
      } else {
        setLoading(false);
      }

      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/verify-email`,
        { token }
      );
      setLoading(false)
      if (!response.data.success) {
        setStatus("failed");
        setMessage(
          response.data.message || "There was an issue verifying your email."
        );
      setLoading(false)

        return;
      }

      setStatus("success");
      setMessage(response?.data?.message);
      return;
    } catch (error: any) {
      setStatus("failed");
      setMessage(JSON.parse(error.request.response).message);
      setLoading(false)
      return;
    }
  };

  useEffect(() => {
    // Simulate API call for email verification
    verifyEmail();
  }, [token]);

  return (
    <Layout>
      <Loader loading={loading} />

    <section className="flex items-center justify-center h-screen bg-gray-100 p-4 sm:p-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
        {status === "success" ? (
          <>
            <h3 className="text-2xl sm:text-3xl font-semibold text-green-700 mb-2">
              Congratulations!
            </h3>
            <p className="mb-8 text-gray-600 font-normal">
              Your email has been successfully verified.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-2xl sm:text-3xl font-semibold text-red-700 mb-2">
              Verification Failed
            </h3>
            <p className="mb-8 text-gray-600 font-normal">
              There was an issue verifying your email.
            </p>
          </>
        )}
        <p className="mb-4 text-gray-800">{message}</p>
        <button
          className="bg-gray-800 text-white font-bold py-2 px-4 rounded w-full mt-4"
          onClick={() => navigate(DashboardPages.SignIn)}
        >
          Login
        </button>
      </div>
      </section>
    </Layout>
      
  );
};

export default VerifyEmail;
