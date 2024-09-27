import React, { createContext, useState } from "react";
import Header from "../components/header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";

export const OpenContext = createContext({});
const Layout = () => {
  const [open, setOpen] = useState(true);
  return (
    <OpenContext.Provider value={{ open, setOpen }}>
      <div className="h-[100vh]">
        <Header />
        <Sidebar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </OpenContext.Provider>
  );
};

export default Layout;
