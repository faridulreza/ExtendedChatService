import React from "react";

import { Document } from "react-pdf";
const PdfViewer = ({ file }) => {
  return (
    <React.Fragment>
      <div className=" flex justify-center items-center">
        <div className=" mt-5 p-5">
          <a href={file} target="_blank">
            <img className="h-[200px] w-[200px]" src={"/img/pdf.png"} />
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PdfViewer;
