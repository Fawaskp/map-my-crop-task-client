"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="p-2 md:p-4 flex justify-center fixed w-full bg-white dark:bg-black z-20">
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
    </div>
  );
}

export default AdminNavbar;
