import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";

const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <>
      <div className="">
        <Suspense
          fallback={
            <div className="w-full h-full font-primary flex justify-center items-center">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
