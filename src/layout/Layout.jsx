// src/layout/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ isScrolled }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header isScrolled={isScrolled} />
      <main className="min-h-[70vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
