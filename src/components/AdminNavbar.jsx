"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Alert from "./Alert";

function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    document.cookie =
      "adminJwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    router.push("/admin/login");
  };

  const handleModalToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Alert
        isModalOpen={isOpen}
        action={logout}
        handleModalToggle={handleModalToggle}
        message={"Are you sure you want to logout?"}
      />

      <div className="p-2 md:p-4 flex justify-center items-end fixed w-full bg-white dark:bg-black z-20">
        <button
          onClick={() => router.push("/admin")}
          type="submit"
          className={`w-1/2 md:w-2/5 py-4 mx-2 dark:text-white border-b-2 ${
            pathname == "/admin"
              ? "border-main-orange"
              : "border-gray-300 dark:border-gray-700"
          } hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300`}
          style={{ fontWeight: "bold" }}
        >
          Home
        </button>
        <button
          onClick={() => router.push("/admin/users")}
          type="submit"
          className={`w-1/2 md:w-2/5 py-4 mx-2 dark:text-white border-b-2 ${
            pathname == "/admin/users"
              ? "border-main-orange"
              : "border-gray-300 dark:border-gray-700"
          } hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300`}
          style={{ fontWeight: "bold" }}
        >
          Users
        </button>
        <span
          onClick={handleModalToggle}
          className="cursor-pointer ms-3 font-bold md:text-xl"
        >
          Logout
        </span>
      </div>
    </>
  );
}

export default AdminNavbar;
