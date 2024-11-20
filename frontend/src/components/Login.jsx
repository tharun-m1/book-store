import React from "react";

function Login() {
  return (
    <div className="tracking-wide">
      <div className="text-[1.25rem] font-semibold text-center mt-3">Login</div>
      <div className="text-[0.825rem] font-primary text-gray-600 text-center">
        Login with your credentials.
      </div>
      <form className="mt-5">
        <div>
          <input
            placeholder="Email..."
            type="email"
            required
            className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none"
          />
        </div>
        <div className="mt-2">
          <input
            placeholder="password..."
            type="password"
            required
            className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none"
          />
        </div>
        <button className="w-full bg-primary mt-5 text-white font-primary text-[1.125rem] py-2 rounded-lg mb-2">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
