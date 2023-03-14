import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Navbar>Logo</Navbar>
      {children}
      <Footer>Footer</Footer>
    </div>
  );
};

export default Layout;
