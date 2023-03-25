import { UserProvider } from "@/lib/AuthContext";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ user, loading = false, children }) => {
  return (
    <UserProvider value={{ user, loading }}>
      <div className="app">
        <Navbar>Logo</Navbar>
        {children}
        <Footer>Footer</Footer>
      </div>
    </UserProvider>
  );
};

export default Layout;
