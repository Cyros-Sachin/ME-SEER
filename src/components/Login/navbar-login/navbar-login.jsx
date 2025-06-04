import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import applogo from "../../../assets/app-logo.png";
import language from "./assets/Basketball.png";
import LoginTab from "../loginTab/loginTab";
import google from "./assets/google.png";
import Footer from "../footer/footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSidebarTracing } from "../../../common-components/SidebarAdvanced/contexts/SidebarTracing";

const NavbarLogin = () => {
  const [isContinueClicked, setIsContinueClicked] = useState(false);
  const navigate = useNavigate();
  const { sidebarUrl, updateSidebarUrl } = useSidebarTracing();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    paid_tier: "free",
    payment_type: "",
    payment_details: "",
  });
  const [errors, setErrors] = useState({});

  const handleGoogleAuthentication = useGoogleLogin({
    onSuccess: (res) => {
      console.log("Google login successful", res);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (isSignup) {
      // Name validation
      if (!formData.name) {
        newErrors.name = "Name is required.";
      }

      // Phone validation
      if (!formData.phone) {
        newErrors.phone = "Phone number is required.";
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid 10-digit phone number.";
      }

      // Payment type validation
      if (!formData.payment_type) {
        newErrors.payment_type = "Payment type is required.";
      }

      // Payment details validation
      if (!formData.payment_details) {
        newErrors.payment_details = "Payment details are required.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      localStorage.removeItem("persistTracing");
      localStorage.removeItem("userId");
      localStorage.removeItem("userInformationStorage");
      localStorage.removeItem("userToken");

      try {
        const endpoint = isSignup
          ? "https://meseer.com/dog/signup"
          : "https://meseer.com/dog/login";

        const data = isSignup
          ? { ...formData }
          : { email: formData.email, password: formData.password };

        const response = await axios.post(endpoint, data);

        const userData = isSignup
          ? { user_id: response.data.uid, ...formData }
          : response.data; // Assuming login response contains user information

        // Store the user data into localStorage under "userInformationStorage"
        localStorage.setItem(
          "userInformationStorage",
          JSON.stringify(userData)
        );
        localStorage.setItem("userId", userData.user_id);
        localStorage.setItem("token", userData.access_token);

        console.log(`${isSignup ? "Signup" : "Login"} successful`, response);
        // Clear the complete local storage
        toast(`${isSignup ? "Signup" : "Login"} successful`);
        updateSidebarUrl("/");
        navigate("/");
      } catch (error) {
        toast("Something went wrong");
        console.error(
          `${isSignup ? "Signup" : "Login"} failed`,

          error.response ? error.response.data : error.message
        );
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
            <h1 className="text-2xl font-bold">Plan it. Note it.</h1>
            <p className="text-gray-500 mt-1">
              {isSignup ? "Sign up for MeSeer" : "Log in to your MeSeer"}
            </p>
          </div>

          <LoginTab
            img={google}
            message="Continue with Google"
            handler={handleGoogleAuthentication}
          />

          <div className="mt-6 space-y-4">
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            {(isSignup || isContinueClicked) && (
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            )}
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            {isSignup && (
              <>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
                <input
                  name="payment_type"
                  value={formData.payment_type}
                  onChange={handleInputChange}
                  placeholder="Enter payment type"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                {errors.payment_type && (
                  <p className="text-red-500 text-sm">{errors.payment_type}</p>
                )}
                <input
                  name="payment_details"
                  value={formData.payment_details}
                  onChange={handleInputChange}
                  placeholder="Enter payment details"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                {errors.payment_details && (
                  <p className="text-red-500 text-sm">
                    {errors.payment_details}
                  </p>
                )}
              </>
            )}
          </div>

          <button
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            onClick={() => {
              if (isSignup || isContinueClicked) {
                handleSubmit();
              } else {
                setIsContinueClicked(true);
              }
            }}
          >
            {isSignup ? "Sign Up" : isContinueClicked ? "Login" : "Continue"}
          </button>

          <div
            className="mt-4 text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => {
              setIsSignup(!isSignup);
              setIsContinueClicked(false);
              setFormData({
                email: "",
                password: "",
                name: "",
                phone: "",
                paid_tier: "free",
                payment_type: "",
                payment_details: "",
              });
              setErrors({});
            }}
          >
            {isSignup
              ? "Already have an account? Log in"
              : "Don't have an account? Sign up"}
          </div>

          {/* Forgot Password Link */}
          {!isSignup && (
            <div
              className="mt-4 text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NavbarLogin;
