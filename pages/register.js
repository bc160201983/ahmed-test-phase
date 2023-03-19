import React from "react";

const register = () => {
  return <div>register</div>;
};

export default register;

register.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
