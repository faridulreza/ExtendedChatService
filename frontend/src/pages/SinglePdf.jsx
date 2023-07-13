import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";


const SinglePdf = () => {
  return (
    <React.Fragment>
      <div className="w-full flex justify-center ">
        <div className="w-[70%] mt-5 p-5">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl="/sample.pdf" />;
          </Worker>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SinglePdf;
