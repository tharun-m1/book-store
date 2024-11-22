import axios from "axios";
import { BASE_URL } from "../config";

export const Signup = async (formData) => {
  try {
    const { fullname, email, password, confirmPassword } = formData;
    const res = await axios.post(`${BASE_URL}/auth/signup`, formData);
    return res;
  } catch (error) {
    throw error;
  }
};

export const SignIn = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, formData);
    return res;
  } catch (error) {
    throw error;
  }
};
