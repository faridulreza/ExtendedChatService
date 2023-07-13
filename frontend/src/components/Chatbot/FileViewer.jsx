const FileViewer = ({ file, fileType }) => {
  if (fileType === "audio") {
    return <audio src={file} />;
  }
  if (fileType === "txt") {
  }

  if (fileType === "pdf") {
  }

  if (fileType === "image") {
  }
  return null;
};

export default FileViewer;
