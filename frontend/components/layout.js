import { UserProvider } from "@/lib/AuthContext";
import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ user, loading = false, children }) => {
  return (
    <UserProvider value={{ user, loading }}>
      <div className="app">
        <Head>
          <title>TURBO BRANDS FACTORY</title>
        </Head>
        <Navbar>Logo</Navbar>
        {children}
        <Footer>Footer</Footer>
      </div>
    </UserProvider>
  );
};

export default Layout;
