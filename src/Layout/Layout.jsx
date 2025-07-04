import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Component/Header/Navbar";
import Footer from "../Component/Footer/Footer";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <header className="bg-white">
        <nav className="">
          <Navbar />
        </nav>
      </header>
      <main>
          <Toaster />
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
