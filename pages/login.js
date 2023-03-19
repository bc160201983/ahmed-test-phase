import React from "react";
import Login from "@/components/Login"

const login = () => {
  return <><Login/></>[]
};

export default login;

login.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
