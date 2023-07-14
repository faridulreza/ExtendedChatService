import React from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { pdfjs } from "pdfjs-dist";

const PdfShareMain = () => {
  const navigate = useNavigate();
  const onButtonClick = () => {
    fetch("/sample.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "downloaded.pdf";
        alink.click();
      });
    });
  };

  // const pdfDocument = pdfjs.getDocument("/sample.pdf");
  // const firstPage = pdfDocument.getPage(1);
  // const firstPageImage = firstPage.getImage({
  //   format: "png",
  //   width: 400,
  //   height: 300,
  // });
  return (
    <React.Fragment>
      <div className="w-full flex flex-col items-center">
        <div
          style={{
            borderTopLeftRadius: "25px",
            borderBottomRightRadius: "25px",
          }}
          className="w-[60%] flex justify-start items-center p-3 gap-x-2 border-[1px] border-[#323A96]"
        >
          <BiSearch className="text-lg text-gray-400" />
          <input
            type="text"
            className="bg-transparent outline-none border-none"
          />
        </div>

        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-10">
          <div
            onClick={() => navigate("/pdf/5")}
            className="w-full flex justify-center cursor-pointer"
          >
            <div className="max-w-sm rounded overflow-hidden shadow-lg border-[1px] border-gray-800 hover:scale-[1.02] hover:delay-150 hover:duration-300 hover:shadow-[#F4F4F5] hover:shadow-sm">
              <img
                className="w-full"
                src="https://img.freepik.com/free-photo/cloud-download-icon-line-connection-circuit-board_1379-888.jpg?w=1380&t=st=1688566560~exp=1688567160~hmac=145b44fea15cf79611b73485ccd3a376d576d7ce4d687bc7bb8f77e9dac11a58"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4 flex justify-between items-center">
                <div className="font-bold text-xl mb-2 text-[#F4F4F5]">
                  <h1>The Coldest Sunset</h1>
                  <p className="text-sm text-gray-400">Name of Author</p>
                </div>
                <button
                  onClick={onButtonClick}
                  className="bg-[#323A96] px-5 py-2 text-[#F4F4F5]"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center ">
            <div className="max-w-sm rounded overflow-hidden shadow-lg border-[1px] border-gray-800 hover:scale-[1.02] hover:delay-150 hover:duration-300 hover:shadow-[#F4F4F5] hover:shadow-sm">
              <img
                className="w-full"
                src="https://img.freepik.com/free-photo/cloud-download-icon-line-connection-circuit-board_1379-888.jpg?w=1380&t=st=1688566560~exp=1688567160~hmac=145b44fea15cf79611b73485ccd3a376d576d7ce4d687bc7bb8f77e9dac11a58"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4 flex justify-between items-center">
                <div className="font-bold text-xl mb-2 text-[#F4F4F5]">
                  <h1>The Coldest Sunset</h1>
                  <p className="text-sm text-gray-400">Name of Author</p>
                </div>
                <button className="bg-[#323A96] px-5 py-2 text-[#F4F4F5]">
                  Download
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="max-w-sm rounded overflow-hidden shadow-lg border-[1px] border-gray-800 hover:scale-[1.02] hover:delay-150 hover:duration-300 hover:shadow-[#F4F4F5] hover:shadow-sm">
              <img
                className="w-full"
                src="https://img.freepik.com/free-photo/cloud-download-icon-line-connection-circuit-board_1379-888.jpg?w=1380&t=st=1688566560~exp=1688567160~hmac=145b44fea15cf79611b73485ccd3a376d576d7ce4d687bc7bb8f77e9dac11a58"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4 flex justify-between items-center">
                <div className="font-bold text-xl mb-2 text-[#F4F4F5]">
                  <h1>The Coldest Sunset</h1>
                  <p className="text-sm text-gray-400">Name of Author</p>
                </div>
                <button className="bg-[#323A96] px-5 py-2 text-[#F4F4F5]">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PdfShareMain;
