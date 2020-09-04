import React from "react";
import Sidebar from "components/Sidebar";

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="content ht-100v pd-0">
        {/* <Header /> */}
        <div className="d-flex h-100">
          <div className="pd-x-0 flex-fill">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
