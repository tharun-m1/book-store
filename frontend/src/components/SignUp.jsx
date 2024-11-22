import React, { useState } from "react";
import toast from "react-hot-toast";
import { Signup } from "../api/auth";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let key in formData) {
      if (formData[key].trim().length === 0) {
        return toast.error(`Invalid ${key}`);
      }
    }
    try {
      setLoading(true);
      const res = await Signup(formData);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
            name="fullname"
            value={formData?.fullname}
            onChange={handleChange}
            placeholder="Full Name..."
            type="text"
            required
            className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none"
          />
        </div>
        <div className="">
          <input
            name="email"
            value={formData?.email}
            onChange={handleChange}
            placeholder="Email..."
            type="email"
            required
            className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none"
          />
        </div>
        <div className="">
          <input
            name="password"
            value={formData?.password}
            onChange={handleChange}
            placeholder="Password min 8 characters"
            type="password"
            required
            className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none"
          />
        </div>
        <div className="">
          <input
            name="confirmPassword"
            value={formData?.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password..."
            type="text"
            required
            className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none"
          />
        </div>
        <button
          disabled={loading}
          onClick={handleSubmit}
          className={` w-full ${
            loading && "bg-slate-400 "
          } bg-primary mt-5 text-white font-primary text-[1.125rem] py-2 rounded-lg mb-2`}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
