import PdfViewer from "./PdfViewer";

const FileViewer = ({ file, fileType }) => {
  if (fileType === "audio") {
    return (
      <audio controls>
        <source src={file} type="audio/mp3" />
      </audio>
    );
  }
  if (fileType === "txt") {
    return (
      <a href={file} target="_blank">
        <u> Text Based file</u>
      </a>
    );
  }

  if (fileType === "pdf") {
    return <PdfViewer file={file} />;
  }

  if (fileType === "image") {
    return <img src={file} alt="" className="w-[350px] h-[200px]" />;
  }
  return null;
};

export default FileViewer;
