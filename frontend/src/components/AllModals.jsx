import React from "react";
import { useSelector } from "react-redux";
import LogoutModal from "./LogoutModal";

function AllModals() {
  const logout = useSelector((state) => state.logout.show);
  return <>{logout && <LogoutModal />}</>;
}

export default AllModals;
