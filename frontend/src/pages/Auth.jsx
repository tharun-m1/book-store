import React, { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Auth() {
  const [activeTab, setActiveTab] = useState(0);
  const token = useSelector((state) => state.auth.token);
  if (token) {
    return <Navigate to={"/home"} />;
  }
  const renderForms = () => {
    if (activeTab === 0) {
      return <Login />;
    }
    return <SignUp />;
  };
  return (
    <div className="min-h-screen flex justify-center items-start bg-secondary">
      <div className="flex flex-col gap-4 w-[90%] md:w-[75%] lg:w-[50%] xl:w-[30%] mt-[100px]">
        <div className="bg-white flex gap-3 p-1 font-primary rounded-md ">
          <button
            onClick={() => setActiveTab(0)}
            className={`flex-grow py-2 rounded-md ${
              activeTab === 0 &&
              "bg-primary text-white transition-colors ease-in duration-100"
            }`}
          >
            Sign In
          </button>

          <button
            onClick={() => setActiveTab(1)}
            className={`flex-grow py-2 rounded-md ${
              activeTab === 1 &&
              "bg-primary text-white transition-colors ease-in duration-100"
            }`}
          >
            Sign Up
          </button>
        </div>
        {/* Form container */}
        <div className="bg-white rounded-md shadow-lg p-3 md:px-5">
          {renderForms()}
        </div>
      </div>
    </div>
  );
}

export default Auth;
