import PdfViewer from "./PdfViewer";

const FileViewer = ({ file, fileType }) => {
  if (fileType === "audio") {
    return <audio src={file} />;
  }
  if (fileType === "txt") {
  }

  if (fileType === "pdf") {
    return <PdfViewer file={file} />
  }

  if (fileType === "image") {
    return <img src={file} alt="" className="w-[350px] h-[200px]" />;
  }
  return null;
};

export default FileViewer;
