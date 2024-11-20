import React from "react";
import { IoAdd } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { open_logout } from "../redux/logoutSlice";

function Header() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(open_logout());
  };
  return (
    <div className="bg-white p-2 py-4 flex justify-between items-center shadow-lg">
      <div className="text-primary font-bold text-[1.5rem] font-primary">
        Book Store
      </div>
      <div className="md:me-5 flex gap-4">
        <button className="flex gap-1 text-[0.875rem] font-semibold justify-center items-center bg-primary text-white font-primary px-3 py-2 rounded-md">
          <span>
            <IoAdd size={20} color="white" />
          </span>
          <span>Add</span>
        </button>
        <button onClick={handleLogout} className="">
          <LuLogOut color="red" size={25} />
        </button>
      </div>
    </div>
  );
}

export default Header;
