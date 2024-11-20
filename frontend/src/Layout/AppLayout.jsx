import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import AllModals from "../components/AllModals";

function AppLayout() {
  return (
    <div className="max-h-screen min-h-screen bg-secondary flex flex-col">
      {/* Header */}
      <div className="">
        <Header />
      </div>
      <div className="flex-1 overflow-y-hidden">
        <Outlet />
      </div>
      <AllModals />
    </div>
  );
}

export default AppLayout;
