import React from "react";

import { Document } from "react-pdf";
const PdfViewer = ({ file }) => {
  return (
    <React.Fragment>
      <div className="w-[400px] h-[300px] flex justify-center items-center">
        <div className="w-[400px] h-[300px] mt-5 p-5">
          <a href={file} target="_blank">
            <Document file={file} />
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PdfViewer;
