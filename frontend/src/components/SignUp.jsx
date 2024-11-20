import React from "react";

function SignUp() {
  return (
    <div className="tracking-wide">
      <div className="text-[1.25rem] font-semibold text-center mt-3">
        Sign Up
      </div>
      <div className="text-[0.825rem] font-primary text-gray-600 text-center">
        Sign up with your Details.
      </div>
      <form className="mt-5 flex flex-col gap-2">
        <div>
          <input
            placeholder="Full Name..."
            type="text"
            required
            className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none"
          />
        </div>
        <div className="">
          <input
            placeholder="Email..."
            type="email"
            required
            className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none"
          />
        </div>
        <div className="">
          <input
            placeholder="Password..."
            type="password"
            required
            className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none"
          />
        </div>
        <div className="">
          <input
            placeholder="Confirm password..."
            type="text"
            required
            className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none"
          />
        </div>
        <button className="w-full bg-primary mt-5 text-white font-primary text-[1.125rem] py-2 rounded-lg mb-2">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
