import React, { useState } from "react";
import toast from "react-hot-toast";
import { SignIn } from "../api/auth";
import { useDispatch } from "react-redux";
import { initiate_user_data } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const res = await SignIn(formData);
      dispatch(initiate_user_data(res.data.token));
      return navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="tracking-wide">
      <div className="text-[1.25rem] font-semibold text-center mt-3">Login</div>
      <div className="text-[0.825rem] font-primary text-gray-600 text-center">
        Login with your credentials.
      </div>
      <form className="mt-5">
        <div>
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
        <div className="mt-2">
          <input
            name="password"
            value={formData?.password}
            onChange={handleChange}
            placeholder="password..."
            type="password"
            required
            className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none"
          />
        </div>
        <button
          onClick={handleSubmit}
          className={`${
            loading && "bg-slate-400 "
          } w-full bg-primary mt-5 text-white font-primary text-[1.125rem] py-2 rounded-lg mb-2`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
