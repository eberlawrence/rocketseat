import React from "react";

const AuthLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className="vw-100 vh-100">{children}</div>
    </>
  );
};

export default AuthLayout;
