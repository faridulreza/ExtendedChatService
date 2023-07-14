import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer = ({ file }) => {
  return (
    <React.Fragment>
      <div className="w-[400px] h-[300px] flex justify-center items-center">
        <div className="w-[400px] h-[300px] mt-5 p-5">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={file} />
          </Worker>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PdfViewer;
