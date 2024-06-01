/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Label from "../Reusable/Label";
import Input from "../Reusable/Input";
import Button from "../Reusable/Button";
import TogglePasswordVisibilityButton from "../Reusable/TogglePassword";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {  validateEmail } from "../helper";
import Layout from "../components/Layout";
import { DashboardPages } from "../interfaces";

interface SignIn {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
    const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);
  const [signInInfo, setSignInInfo] = useState<SignIn>({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState("");

  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const handleSignIn = async () => {
    try {
      const isValidEmail = validateEmail(signInInfo.email);
  
      if (!isValidEmail) {
        setShowError("Please enter a valid email.");
        return;
      }

      const response = await axios.post("https://quiz-server-optimize-2.onrender.com/api/users/login", {
        email: signInInfo.email,
        password: signInInfo.password,
      },
      { withCredentials: true }
      );

      console.log(response)
      
  
      if (!response.data?.success) {
        toast.error(response.data.message || "Login failed", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return;
      }

      localStorage.setItem("user", response.data?.id)
  
      toast.success("Login successful", {
        autoClose: 2000,
        hideProgressBar: true,
      });
  
      setSignInInfo({
        email: "",
        password: "",
      });
  
      navigate(DashboardPages.Dashboard); 
      return
  
    } catch (error:any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      setShowError(errorMessage);
      toast.error(errorMessage, {
        autoClose: 2000,
        hideProgressBar: true,
      });
      return
    }
  };

  return (
    <Layout>

      <section className="flex items-center justify-center h-screen bg-gray-100 p-4 sm:p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-semibold text-blue-gray-700 mb-2 text-center">
            Sign In
          </h3>
          <p className="mb-8 text-gray-600 font-normal text-center">
            Enter your email and password to sign in
          </p>
          <form action="#" className="text-left">
            <div className="mb-4">
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@mail.com"
                onChange={(e) =>
                  setSignInInfo((el) => ({
                    ...el,
                    email: e.target.value,
                  }))
                }
                value={signInInfo.email}
              />
            </div>
            <div className="mb-4 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={passwordShown ? "text" : "password"}
                name="password"
                placeholder="****"
                onChange={(e) =>
                  setSignInInfo((el) => ({
                    ...el,
                    password: e.target.value,
                  }))
                }
                value={signInInfo.password}
              />
              <TogglePasswordVisibilityButton
                onClick={togglePasswordVisibility}
                confirmPasswordShown={passwordShown}
              ></TogglePasswordVisibilityButton>
            </div>
            <p className="text-red-400">{showError}</p>
            <Button
              className="bg-gray-800 text-white font-bold py-2 px-4 rounded w-full mt-4"
              disabled={!signInInfo.password || !signInInfo.email}
              onClick={handleSignIn}
            >
              Sign In
            </Button>

            <div className="mt-4 flex justify-between items-center">
              <a href="#" className="text-blue-gray-600 font-medium">
                Forgot password?
              </a>
              <a
                href="https://quiz-server-optimize-2.onrender.com/sign-up"
                className="text-blue-gray-600 font-medium"
              >
                Create account
              </a>
            </div>
          </form>
        </div>
        </section>
        
    </Layout>
  );
};

export default SignIn;
