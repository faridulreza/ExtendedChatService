import React from "react";
import Loader from "../components/Loader";

const About = () => {
  return (
    <React.Fragment>
      <div className="w-full h-screen">
        <div className="w-full flex justify-center">
          <div className="max-w-sm rounded overflow-hidden shadow-lg border-[1px] border-gray-800 hover:scale-[1.02] hover:delay-150 hover:duration-300 hover:shadow-[#F4F4F5] hover:shadow-sm">
            <img
              className="w-full"
              src="https://img.freepik.com/free-photo/cloud-download-icon-line-connection-circuit-board_1379-888.jpg?w=1380&t=st=1688566560~exp=1688567160~hmac=145b44fea15cf79611b73485ccd3a376d576d7ce4d687bc7bb8f77e9dac11a58"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-[#F4F4F5]">
                The Coldest Sunset
              </div>
              <p className="text-gray-500 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div className="w-full flex justify-center py-5 p-3">
              <button className="bg-[#323A96] px-5 py-2 text-[#F4F4F5]">
                See more
              </button>
            </div>
          </div>
        </div>
        <Loader />
      </div>
    </React.Fragment>
  );
};

export default About;
