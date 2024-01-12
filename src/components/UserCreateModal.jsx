import React, { useRef, useState } from "react";
import { adminAxiosInstance } from "../utils/axiosUtils";
import { toast } from "react-toastify";
import { useFormikValidation } from "../validation/Formik";
import { RegisterSchema } from "../validation/Yup";

function UseCreateModal({ isOpen, onClose,fetchUsers }) {
  const initialValues = {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  };
  const superuserRef = useRef();

  const handleSubmit = () => {
    console.log("Hellllo -->", values);
    const isSu = superuserRef.current.checked;
    const url = isSu ? "create-admin/" : "create-user/";
    adminAxiosInstance
      .post(url, values)
      .then((res) => {
        console.log(res);
        toast.success(`${isSu?'Admin':'User'} created Successfully`)
        fetchUsers()
        onClose()
      })
      .catch((err) => {
        if (err.response.data.username) {
          toast.error(err.response.data.username[0]);
        } else {
          toast.error("Something went wrong");
        }
        console.log(err.response.data);
      });
  };

  const formik = useFormikValidation(
    handleSubmit,
    RegisterSchema,
    initialValues
  );
  const { values, errors, touched, handleBlur, handleChange } = formik;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className="relative p-5 w-1/2 mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white dark:bg-gray-900 border border-gray-500 rounded-lg outline-none focus:outline-none p-6">
              <div className="flex gap-3 mb-4">
                <h4 className="font-bold text-2xl">Create New User</h4>
              </div>

              <div className="flex flex-col px-5">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mt-4">
                    <input
                      name="username"
                      placeholder="Username"
                      className="w-full text-black dark:text-white dark:bg-black rounded-md p-3 border border-gray-500"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      error={touched.username && errors.username}
                    />
                    {touched.username && errors.username && (
                      <div className="text-red-500 text-xs py-1">
                        {errors.username}
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <input
                      name="email"
                      placeholder="E-mail"
                      className="w-full text-black dark:text-white dark:bg-black rounded-md p-3 border border-gray-500"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={touched.email && errors.email}
                    />
                    {touched.email && errors.email && (
                      <div className="text-red-500 text-xs py-1">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 mb-4">
                    <input
                      name="password"
                      placeholder="Password"
                      className="w-full text-black dark:text-white dark:bg-black rounded-md p-3 border border-gray-500"
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
                      placeholder="Confirm Password"
                      className="w-full text-black dark:text-white dark:bg-black rounded-md p-3 border border-gray-500"
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

                  <div className="flex items-center py-2 pb-4">
                    <input
                      id="superuser"
                      type="checkbox"
                      ref={superuserRef}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="superuser"
                      className="ms-2 font-medium text-gray-900 dark:text-gray-300"
                    >
                      Create as super user
                    </label>
                  </div>

                  <div className="md:w-1/2 mx-auto">
                    <button
                      type="submit"
                      className="w-full mx-auto p-2 bg-main-orange hover:bg-main-orange-dark transition-all duration-300 text-white rounded-lg"
                      style={{ fontWeight: "bold" }}
                    >
                      Create User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UseCreateModal;
