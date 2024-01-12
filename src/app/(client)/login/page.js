"use client";
import React from "react";
import { LoginSchema } from "../../../validation/Yup";
import { useFormikValidation } from "../../../validation/Formik";
import { baseAxiosInstance } from "../../../utils/axiosUtils";
import { toast } from "react-toastify";

export default function LoginPage() {
  const initialValues = { username: "", password: "" };

  const handleSubmit = (e) => {
    // console.log('Hellllo -->', values);
    baseAxiosInstance.post('token/', values).then((res) => {
      console.log(res);
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

  const formik = useFormikValidation(handleSubmit, LoginSchema, initialValues);
  const { values, errors, touched, handleBlur, handleChange } = formik;

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="md:w-96 sm:w-80 ">
          <form
            className="rounded-lg p-12 border-2 border-main-green"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="font-bold text-xl text-center text-main-green dark:text-white">
              Login Here
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
                <div className="text-red-500 text-xs py-1">
                  {errors.password}
                </div>
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
            {/* <div className="mb-2 mt-2 sm:ml-0 md:ml-8 lg:ml-8 xl:ml-8">
            <span>Don't have an account? </span>
            <Link href="/register">
            <span className="text-main-green" >
            Signup
            </span>
            </Link>
          </div> */}
          </form>
        </div>
      </div>
    </>
  );
}