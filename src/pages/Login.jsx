import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAsync } from "../pages/store/authSlice"; 
import OnboardingImage from "../assets/images/OnboardingImage.png";

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Email format is invalid"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user, isAuth } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuth && user) {
      navigate("/");
    }
  }, [isAuth, user, navigate]);

  // Email validation helper function
  const validateEmailFormat = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email format (e.g., user@example.com)";
    }

    return "";
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Additional email validation
      const emailError = validateEmailFormat(values.email);
      if (emailError) {
        setEmailValidationError(emailError);
        return;
      }

      setEmailValidationError("");
      setIsLoading(true);

      try {
        const resultAction = await dispatch(
          loginAsync({
            email: values.email,
            password: values.password,
          })
        );

        if (loginAsync.fulfilled.match(resultAction)) {
          // Login successful - show success alert
          setShowSuccessAlert(true);

          // Hide alert after 2 seconds and redirect
          setTimeout(() => {
            setShowSuccessAlert(false);
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Real-time email validation
  const handleEmailChange = (e) => {
    const email = e.target.value;
    formik.handleChange(e);

    if (email && emailValidationError) {
      const error = validateEmailFormat(email);
      setEmailValidationError(error);
    }
  };

  const handleEmailBlur = (e) => {
    formik.handleBlur(e);
    const email = e.target.value;
    if (email) {
      const error = validateEmailFormat(email);
      setEmailValidationError(error);
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleForgotPasswordClick = () => {
    alert("Forgot password functionality will be implemented soon!");
  };

  // Success Alert Component
  const SuccessAlert = () => (
    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
      <div className="w-6 h-6 bg-white text-green-500 rounded-full flex items-center justify-center font-bold text-sm">
        ✓
      </div>
      <div>
        <p className="font-semibold">Login Successful!</p>
        <p className="text-sm opacity-90">Welcome back! Redirecting...</p>
      </div>
    </div>
  );

  // Error message helper function
  const getFirebaseErrorMessage = (errorMessage) => {
    if (errorMessage?.includes("user-not-found")) {
      return "No account found with this email address. Please sign up first.";
    }
    if (
      errorMessage?.includes("wrong-password") ||
      errorMessage?.includes("invalid-credential")
    ) {
      return "Incorrect password. Please try again.";
    }
    if (errorMessage?.includes("too-many-requests")) {
      return "Too many failed attempts. Please try again later.";
    }
    if (errorMessage?.includes("user-disabled")) {
      return "This account has been disabled. Please contact support.";
    }
    return errorMessage || "Login failed. Please try again.";
  };

  return (
    <>
      {/* Success Alert */}
      {showSuccessAlert && <SuccessAlert />}

      <div className="flex flex-col md:flex-col lg:flex-row items-center justify-center gap-10 lg:gap-28 mt-6 mb-10 px-4 sm:px-8 md:px-12">
        {/* Onboarding Image — hidden on mobile */}
        <img
          src={OnboardingImage}
          width={700}
          alt="OnboardingImage"
          className="w-full max-w-[350px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] md:block hidden"
        />

        {/* Form Section */}
        <div className="w-full max-w-md place-self-center">
          <p className="text-2xl font-medium mb-3 text-center lg:text-left">
            Log in to Exclusive
          </p>
          <p className="text-sm mb-10 text-center lg:text-left">
            Enter your details below
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center gap-2">
              <span className="text-[#DB4444] font-bold">⚠</span>
              <div>
                <p className="font-medium">Login Failed</p>
                <p className="text-sm">{getFirebaseErrorMessage(error)}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            {/* Email Field */}
            <div className="flex flex-col">
              <input
                className={`focus:outline-none border-b-2 pb-2 transition-colors duration-200 ${
                  (formik.touched.email && formik.errors.email) ||
                  emailValidationError
                    ? "border-b-[#DB4444]"
                    : "border-b-gray-300 focus:border-b-blue-500"
                }`}
                type="email"
                name="email"
                id="email"
                placeholder="Email (e.g., user@gmail.com)"
                value={formik.values.email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                autoComplete="email"
              />
              {((formik.touched.email && formik.errors.email) ||
                emailValidationError) && (
                <span className="text-[#DB4444] text-xs mt-1 flex items-center gap-1">
                  <span>⚠</span> {emailValidationError || formik.errors.email}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <div className="relative">
                <input
                  className={`w-full focus:outline-none border-b-2 pb-2 pr-10 transition-colors duration-200 ${
                    formik.touched.password && formik.errors.password
                      ? "border-b-[#DB4444]"
                      : "border-b-gray-300 focus:border-b-blue-500"
                  }`}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="current-password"
                />
                <div
                  type="button"
                  className="absolute right-0 top-0 h-full px-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <span className="text-[#DB4444] text-xs mt-1 flex items-center gap-1">
                  <span>⚠</span> {formik.errors.password}
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center sm:items-center">
              <button
                type="submit"
                disabled={isLoading || !formik.isValid || emailValidationError}
                className={`py-3 px-8 rounded-md font-medium w-full sm:w-auto transition-all duration-200 ${
                  isLoading || !formik.isValid || emailValidationError
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-[#DB4444] hover:bg-red-600 text-white"
                }`}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>

              <p
                type="button"
                onClick={handleForgotPasswordClick}
                className="text-red-400 hover:text-red-600 text-sm transition-colors duration-200 cursor-pointer"
              >
                Forgot Password?
              </p>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-md text-[#333] mt-4">
              Don't have an account?
              <span
                onClick={handleSignUpClick}
                className="ml-2 underline cursor-pointer transition-colors duration-200"
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
