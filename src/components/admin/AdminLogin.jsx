"use client";
import React, { useState } from "react";
import { LoginSchema } from "@/validation/Yup";
import { useFormikValidation } from "@/validation/Formik";
import { adminBaseAxiosInstance } from "@/utils/axiosUtils";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "@/utils/clientCookie";
import { jwtDecode } from "jwt-decode";

function AdminLogin() {
  const initialValues = { username: "", password: "" };
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);

  //  function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    adminBaseAxiosInstance
      .post("token/", values)
      .then((res) => {
        console.log(res);
        const token = res.data.access;
        if (jwtDecode(token).role == "user") {
          toast.error("You don't have admin access");
          router.push('/login')
          return;
        }
        setCookie("adminJwt", token, 3);
        router.push("/admin");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.detail) {
          toast.error(err.response.data.detail);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const formik = useFormikValidation(handleSubmit, LoginSchema, initialValues);
  const { values, errors, touched, handleBlur, handleChange } = formik;

  return (
    <div className="md:w-96 sm:w-80 ">
      <form
        className="rounded-lg p-12 border-2 border-main-green"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="font-bold text-xl text-center text-main-green dark:text-white">
          Admin Login
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
            className="w-full text-black dark:text-white dark:bg-black rounded-md p-3 border border-main-green"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={touched.password && errors.password}
          />
          {touched.password && errors.password && (
            <div className="text-red-500 text-xs py-1">{errors.password}</div>
          )}
        </div>

        <div className="md:w-1/2 mx-auto">
          <button
            type="submit"
            className="w-full mx-auto p-2 bg-main-orange hover:bg-main-orange-dark transition-all duration-300 text-white rounded-lg"
            style={{ fontWeight: "bold" }}
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
