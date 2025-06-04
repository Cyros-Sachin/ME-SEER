import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import applogo from "../../assets/app-logo.png";
import language from "../../components/Login/navbar-login/assets/Basketball.png";
import { useSidebarTracing } from "../../common-components/SidebarAdvanced/contexts/SidebarTracing";
import axios from "axios";
import Footer from "../../components/Login/footer/footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { updateSidebarUrl } = useSidebarTracing();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Call API to send password reset email (you should implement this API)
        const response = await axios.post(
          "https://your-api-url.com/forgot-password",
          { email }
        );

        if (response.data.success) {
          toast.success("Password reset email sent successfully!");
          navigate("/login");
        } else {
          toast.error("Something went wrong, please try again.");
        }
      } catch (error) {
        toast.error("Something went wrong, please try again.");
        console.error("Forgot password error:", error);
      }
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      <div className="flex items-center">
        <div className="flex items-center ml-8 sm:ml-36 mt-6">
          <img className="h-10" src={applogo} alt="app-logo" />
          <div className="text-gray-400 mx-3 text-xl">|</div>
          <img className="h-6" src={language} alt="language" />
          <div className="ml-2 text-sm text-gray-600">English</div>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Forgot Password?</h1>
            <p className="text-gray-500 mt-1">
              Enter your email address to receive password reset instructions.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <button
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Send Reset Link
          </button>

          <div
            className="mt-4 text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Remember your password? Log in
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
