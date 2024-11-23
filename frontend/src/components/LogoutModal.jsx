import React from "react";
import { useDispatch } from "react-redux";
import { close_logout } from "../redux/logoutSlice";
import { useNavigate } from "react-router-dom";
import { initiate_user_data } from "../redux/authSlice";

function LogoutModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCancel = () => {
    dispatch(close_logout());
  };
  const handleLogout = () => {
    dispatch(initiate_user_data(null));
    dispatch(close_logout());
    return navigate("/");
  };
  return (
    <div className="modal flex justify-center items-center font-primary">
      <div className="bg-white p-3 w-[90%] sm:w-[50%] md:w-[30%] lg:w-[25%] rounded-md">
        <div className="text-center text-[1.5rem] font-bold mt-2">Logout?</div>
        <div className="text-center tet-[1.5rem] font-light mt-2">
          Are you sure, you want to logout?
        </div>
        <div className="flex gap-2 mt-5">
          <button
            onClick={handleCancel}
            className="flex-1 bg-slate-200 p-3 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-600 p-3 rounded-md text-white"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
