import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <header>Logo</header>
      {children}
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
