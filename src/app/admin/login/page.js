import AdminLogin from "@/components/AdminLogin";
import React from "react";

export const revalidate = 0

export default function LoginPage() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <AdminLogin />
      </div>
    </>
  );
}