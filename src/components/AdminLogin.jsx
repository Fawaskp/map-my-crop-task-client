"use client";
import React, { useEffect } from "react";
import { LoginSchema } from "@/validation/Yup";
import { useFormikValidation } from "@/validation/Formik";
import { baseAxiosInstance } from "@/utils/axiosUtils";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function AdminLogin() {

  const initialValues = { username: "", password: "" };
  const router = useRouter();
  
  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const handleSubmit = (e) => {
    // console.log('Hellllo -->', values);
    baseAxiosInstance
      .post("token/", values)
      .then((res) => {
        console.log(res);
        setCookie("adminJwt", res.data.access, 3);
        router.push("/admin");
      })
      .catch((err) => {
        if (err.response.data.detail) {
          toast.error(err.response.data.detail);
        } else {
          toast.error("Something went wrong");
        }
        console.log(err);
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

        <div className="mt-4 mb-4">
          <input
            name="password"
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
