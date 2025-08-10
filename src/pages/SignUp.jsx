import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAsync } from "./store/authSlice";
import OnboardingImage from "../assets/images/OnboardingImage.png";
import SuperG from "../assets/images/super-g.png";

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Email format is invalid. Please use a valid email address"
    ),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const resultAction = await dispatch(
          registerAsync({
            email: values.email,
            password: values.password,
          })
        );

        if (registerAsync.fulfilled.match(resultAction)) {
          // Registration successful
          navigate("/");
        }
      } catch (error) {
        console.error("Registration failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-col lg:flex-row items-center justify-center gap-10 lg:gap-28 mt-6 mb-10 px-4 sm:px-8 md:px-12">
      {/* Image Section */}
      <img
        src={OnboardingImage}
        alt="Onboarding"
        className="w-full max-w-[350px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] md:block hidden"
      />

      {/* Form Section */}
      <div className="w-full max-w-md place-self-center">
        <p className="text-xl sm:text-2xl font-medium mb-3 text-center lg:text-left">
          Create an account
        </p>
        <p className="text-sm mb-8 text-center lg:text-left">
          Enter your details below
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <div className="flex flex-col">
            <input
              className={`focus:outline-none border-b-2 pb-2 ${
                formik.touched.name && formik.errors.name
                  ? "border-b-[#DB4444]"
                  : "border-b-gray-300 focus:border-b-blue-500"
              }`}
              type="text"
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <span className="text-[#DB4444] text-xs mt-1">
                {formik.errors.name}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <input
              className={`focus:outline-none border-b-2 pb-2 ${
                formik.touched.email && formik.errors.email
                  ? "border-b-[#DB4444]"
                  : "border-b-gray-300 focus:border-b-blue-500"
              }`}
              type="email"
              name="email"
              placeholder="Email or Phone Number"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-[#DB4444] text-xs mt-1">
                {formik.errors.email}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <input
              className={`focus:outline-none border-b-2 pb-2 ${
                formik.touched.password && formik.errors.password
                  ? "border-b-[#DB4444]"
                  : "border-b-gray-300 focus:border-b-blue-500"
              }`}
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <span className="text-[#DB4444] text-xs mt-1">
                {formik.errors.password}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formik.isValid}
            className={`py-3 px-6 rounded-md font-medium transition-all duration-200 ${
              isLoading || !formik.isValid
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#DB4444] hover:bg-red-600 text-white"
            }`}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Google Sign Up */}
          <div
            type="button"
            className="flex items-center justify-center gap-3 border cursor-pointer border-gray-300 rounded-md px-6 py-3 hover:bg-gray-50 transition-colors duration-200"
          >
            <img src={SuperG} width={24} alt="Google" />
            <p className="text-sm sm:text-base">Sign up with Google</p>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm sm:text-base text-[#333]">
            Already have an account?
            <span
              onClick={handleLoginClick}
              className="ml-2 underline cursor-pointer hover:text-blue-600 transition-colors duration-200"
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
