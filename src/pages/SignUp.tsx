/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Input from "../Reusable/Input";
import Button from "../Reusable/Button";
import Label from "../Reusable/Label";
import TogglePasswordVisibilityButton from "../Reusable/TogglePassword";
import { toast } from "react-toastify";
import axios from "axios";
import { validateEmail } from "../helper";
import Layout from "../components/Layout";
import Loading from "../Reusable/Loader";
// import { useNavigate } from "react-router-dom";

interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  // const navigate = useNavigate()
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [confirmPasswordShown, setConfirmPasswordShown] =
    useState<boolean>(false);
  const [createUser, setCreateUser] = useState<CreateUser>({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });
  const [showError, setShowError] = useState<string>("");
  const [showContainer, setShowContainer] = useState<
    "create-user" | "send-verification-email" | "user-already-exists"
  >("create-user");
  const [loading, setLoading] = useState<boolean>(false);

  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordShown((cur) => !cur);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const isValidEmail = validateEmail(createUser.email);

      if (!isValidEmail) {
        setShowError("Please enter a valid email.");
        return;
      }

      if (createUser.password !== createUser.confirmPassword) {
        setShowError("Password and confirm password should be same");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        "https://quiz-server-optimize-2.onrender.com/api/users/register",
        {
          firstName: createUser.firstName,
          lastName: createUser.lastName,
          email: createUser.email,
          number: createUser.number,
          password: createUser.password,
        }
      );
      setLoading(false);

      if (!response?.data?.success) {
        toast.error(response?.data?.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
      setLoading(false);
        return;
      }

      toast.success(response?.data?.message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
      setShowContainer("send-verification-email");
      setCreateUser({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        password: "",
        confirmPassword: "",
      });
      return;
    } catch (error: any) {
      toast.error(JSON.parse(error.request.response).message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
      setLoading(false);
      return;
    }
  };

  const disableSubmitBtn = () => {
    if (
      createUser.firstName === "" ||
      createUser.lastName === "" ||
      createUser.email === "" ||
      createUser.number === "" ||
      createUser.number.length !== 10 ||
      createUser.password === "" ||
      createUser.confirmPassword === ""
    ) {
      return true;
    }
    return false;
  };

  return (
    <Layout>
      <Loading loading={loading} />
      <section className="flex items-center justify-center h-screen bg-gray-100 p-2 sm:p-8">
        {showContainer === "create-user" && (
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h3 className="text-2xl sm:text-3xl font-semibold text-blue-gray-700 mb-2 text-center">
              Sign Up
            </h3>
            <p className="mb-8 text-gray-600 font-normal text-center">
              Enter your details to create an account
            </p>
            <form action="#" className="text-left">
              <div className="flex">
                <div className="mb-4">
                  <Label htmlFor="name">First Name</Label>
                  <Input
                    id="name"
                    name="First Name"
                    type="text"
                    placeholder="First Name"
                    onChange={(prev) =>
                      setCreateUser((el) => ({
                        ...el,
                        firstName: prev.target.value,
                      }))
                    }
                    value={createUser?.firstName}
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="name">Last Name</Label>
                  <Input
                    id="name"
                    name="Last Name"
                    type="text"
                    placeholder="Last Name"
                    onChange={(prev) =>
                      setCreateUser((el) => ({
                        ...el,
                        lastName: prev.target.value,
                      }))
                    }
                    value={createUser?.lastName}
                  />
                </div>
              </div>
              {/* Email */}
              <div className="mb-4">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  name="Email"
                  type="email"
                  placeholder="Email"
                  onChange={(prev) =>
                    setCreateUser((el) => ({
                      ...el,
                      email: prev.target.value,
                    }))
                  }
                  value={createUser?.email}
                />
              </div>
              {showError && <p className="text-red-400">{showError}</p>}

              {/* Number */}
              <div className="mb-4">
                <Label htmlFor="email">Your Number</Label>
                <Input
                  id="email"
                  name="Number"
                  type="number"
                  placeholder="Number"
                  onChange={(prev) =>
                    setCreateUser((el) => ({
                      ...el,
                      number: prev.target.value,
                    }))
                  }
                  value={createUser?.number}
                />
              </div>

              <div className="flex">
                {/* Passoword */}
                <div className="mb-4 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="Password"
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                    onChange={(prev) => {
                      setCreateUser((el) => ({
                        ...el,
                        password: prev.target.value,
                      }));
                      setShowError("");
                    }}
                    value={createUser?.password}
                  />
                  {/* Show Password */}

                  <TogglePasswordVisibilityButton
                    onClick={togglePasswordVisibility}
                    confirmPasswordShown={confirmPasswordShown}
                  ></TogglePasswordVisibilityButton>
                </div>
                {/* Confirm Password */}
                <div className="mb-4 relative">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type={confirmPasswordShown ? "text" : "password"}
                    name="confirm-password"
                    placeholder="Confirm Password"
                    onChange={(prev) => {
                      setCreateUser((el) => ({
                        ...el,
                        confirmPassword: prev.target.value,
                      }));
                      setShowError("");
                    }}
                    value={createUser?.confirmPassword}
                  />
                  {showError && <p className="text-red-400">{showError}</p>}
                  {/* Show Password */}
                  <TogglePasswordVisibilityButton
                    onClick={toggleConfirmPasswordVisibility}
                    confirmPasswordShown={confirmPasswordShown}
                  ></TogglePasswordVisibilityButton>
                </div>
              </div>

              <Button onClick={handleSubmit} disabled={disableSubmitBtn()}>
                Sign Up
              </Button>
              <div className="mt-4 flex justify-center">
                <a href="/sign-in" className="text-blue-gray-600 font-medium">
                  Already have an account? Sign In
                </a>
              </div>
            </form>
          </div>
        )}

        {showContainer === "send-verification-email" && (
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h3 className="text-2xl sm:text-3xl font-semibold text-blue-gray-700 mb-2 text-center">
              Verify Your Email
            </h3>
            <p className="mb-8 text-gray-600 font-normal text-center">
              A verification link has been sent to your email address. Please
              check your inbox and follow the instructions to verify your
              account.
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default SignUp;
