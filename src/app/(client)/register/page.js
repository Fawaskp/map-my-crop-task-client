"use client";
import React, { useState } from "react";
import { RegisterSchema } from "@/validation/Yup";
import { useFormikValidation } from "@/validation/Formik";
import { userAxiosInstance } from "@/utils/axiosUtils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const initialValues = { username: "", password: "", email: "", confirmPassword: "" };
  const router = useRouter()
  const [passwordVisible, setPasswordVisible] = useState(false);

  //  function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const handleSubmit = () => {
    // console.log('values-> ', values)
    userAxiosInstance.post('/register/', values).then((res) => {
      toast.success('Account created sucessfully')
      router.push('/login')
    }).catch((err) => {
      if (err.response.data.detail) {
        toast.error(err.response.data.detail)
      }
      else {
        toast.error('Something went wrong')
      }
      console.log(err.response.data);
    })
  };

  const formik = useFormikValidation(handleSubmit, RegisterSchema, initialValues);
  const { values, errors, touched, handleBlur, handleChange } = formik;

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="mx-3 sm:mx-0 sm:w-1/2 max-w-2xl">
          <form
            className="rounded-lg p-12 border-2 border-main-green"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="font-bold text-xl md:text-2xl text-center text-main-green dark:text-white">
              Register Here
            </h2>

            <div className="mt-4">
              <input
                name="username"
                placeholder="Username"
                className="w-full text-black dark:text-white dark:bg-black rounded-md p-3 border border-main-green"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                error={touched.username && errors.username}
              />
              {touched.username && errors.username && (
                <div className="text-red-500 text-xs py-1">{errors.username}</div>
              )}
            </div>

            <div className="mt-4">
              <input
                name="email"
                placeholder="E-mail"
                className="w-full text-black dark:text-white dark:bg-black rounded-md p-3 border border-main-green"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && errors.email}
              />
              {touched.username && errors.email && (
                <div className="text-red-500 text-xs py-1">{errors.email}</div>
              )}
            </div>

            <div className="relative mt-4 mb-4">
              {passwordVisible ? (
                <svg
                  onClick={togglePasswordVisibility}
                  className="dark:invert absolute cursor-pointer w-4 right-3 -top-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="61"
                  height="61"
                  viewBox="0 0 61 61"
                  fill="none"
                >
                  <path
                    d="M37.5727 30.4089C37.5727 34.5512 34.2149 37.9089 30.0727 37.9089C25.9307 37.9089 22.5728 34.5512 22.5728 30.4089C22.5728 26.2667 25.9307 22.9089 30.0727 22.9089C34.2149 22.9089 37.5727 26.2667 37.5727 30.4089Z"
                    stroke="black"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M30.0741 12.9089C18.8799 12.9089 9.40421 20.2661 6.21851 30.4089C9.40416 40.5517 18.8799 47.9089 30.0741 47.9089C41.2681 47.9089 50.7438 40.5517 53.9296 30.4089C50.7438 20.2662 41.2681 12.9089 30.0741 12.9089Z"
                    stroke="black"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  onClick={togglePasswordVisibility}
                  className="dark:invert absolute cursor-pointer w-4 right-3 -top-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                >
                  <path
                    d="M7.49755 7.5L52.4975 52.5M24.6083 24.7841C23.3017 26.134 22.4976 27.973 22.4976 30C22.4976 34.1423 25.8555 37.5 29.9975 37.5C32.0538 37.5 33.9168 36.6725 35.2715 35.3325M16.2476 16.6179C11.4993 19.7509 7.88263 24.4599 6.14258 30C9.3282 40.1427 18.804 47.5 29.998 47.5C34.9703 47.5 39.6035 46.0485 43.497 43.546M27.4975 12.6235C28.32 12.5418 29.1543 12.5 29.998 12.5C41.1923 12.5 50.668 19.8573 53.8535 30C53.1518 32.235 52.1443 34.3345 50.8805 36.25"
                    stroke="black"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="w-full text-black  dark:text-white dark:bg-black rounded-md p-3 border border-main-green"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && errors.password}
              />
              {touched.password && errors.password && (
                <div className="text-red-500 text-xs py-1">
                  {errors.password}
                </div>
              )}
            </div>

            <div className="mt-4 mb-4">
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="w-full text-black dark:text-white dark:bg-black rounded-md p-3 border border-main-green"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="text-red-500 text-xs py-1">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <div className="md:w-1/2 mx-auto">
              <button
                type="submit"
                className="w-full mx-auto p-2 bg-main-orange hover:bg-main-orange-dark transition-all duration-300 text-white rounded-lg"
                style={{ fontWeight: "bold" }}
              >
                Register
              </button>
            </div>
            <div className="mt-4 flex justify-center text-sm sm:text-base">
              <span>
                <span className="text-gray-500 dark:text-gray-300" >Already have a account?</span>
                <Link href="/login">
                  <span className="mx-2 font-medium" >
                    Login
                  </span>
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}