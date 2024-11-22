import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Protected({ Component }) {
  const token = useSelector((state) => state.auth.token);

  return token ? <Component /> : <Navigate to="/" />;
}

export default Protected;
