import React, { useState } from "react";
import Header from "../components/header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";

const Layout = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="h-[100vh]">
      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} />
      <main>
        <Outlet />
      </main>
      <Footer open={open} />
    </div>
  );
};

export default Layout;
