"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  const handleGoBack = () => {
    // router.replace("/network/feed")
    router.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-primary">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center w-full md:w-[30%]">
        <h1 className="text-6xl font-bold text-gray-800">Oops!</h1>
        <p className="mt-4 text-lg text-gray-600">
          {"Something went wrong. Please try again later."}
        </p>
        <p className="text-sm text-gray-600">{error.message}</p>
        <button
          onClick={handleGoBack}
          className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
