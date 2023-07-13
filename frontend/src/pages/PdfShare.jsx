import React from "react";
import PdfShareMain from "../components/PdfShare/PdfShareMain";

const PdfShare = () => {
  return (
    <React.Fragment>
      <div className="w-full min-h-screen flex justify-center items-start">
        <div className="w-[70%] flex justify-center items-center mt-10">
          <PdfShareMain />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PdfShare;
