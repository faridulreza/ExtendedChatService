import React from "react";
import {
  BiLogoTwitter,
  BiLogoFacebookSquare,
  BiLogoInstagramAlt,
  BiLogoGithub,
} from "react-icons/bi";
import { Link } from "react-router-dom";

const items = [
  {
    id: 1,
    name: "Home",
  },
  {
    id: 2,
    name: "About",
  },
  {
    id: 3,
    name: "Contact us",
  },
  {
    id: 4,
    name: "Blogs",
  },
];
const Footer = () => {
  return (
    <React.Fragment>
      <div className="w-full h-[40vh] flex justify-center items-center bg-[#0A0A12] shadow-lg border-2 border-gray-900 p-5">
        <div className="w-[65%] flex flex-col justify-between items-start p-5">
          <div className="w-full grid grid-cols-3 gap-10">
            <div className="fle flex-col items-start">
              <h1 className="text-2xl font-bold text-[#F4F4F5]">Title</h1>
              <span className="text-[#F4F4F5] text-md">
                Lorem ipsum dolor sit amet.
              </span>
            </div>
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-2xl font-bold text-[#F4F4F5]">Menu</h1>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="w-64 border-b-[1px] border-gray-800 p-2 hover:bg-gray-800 hover:rounded-lg text-[#F4F4F5]"
                >
                  <Link to={"/"}>{item.name}</Link>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-2xl font-bold text-[#F4F4F5]">
                Get Updated news
              </h1>
              <p className="text-[#F4F4F5] text-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex justify-start gap-x-5 mt-3 items-center">
                <input
                  type="text"
                  placeholder="Email"
                  className="outline-none py-2 px-4"
                />
                <button className="px-5 py-2 bg-[#323A96] text-white text-md">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-cent">
            <div className="flex justify-start items-center gap-x-10">
              <Link
                to={"/"}
                className="h-8 w-8 p-1 bg-[#16151F] border-[1px] border-gray-800 flex justify-center items-center rounded-md hover:bg-[#323A96]"
              >
                <BiLogoTwitter className="text-white text-xl" />
              </Link>
              <Link
                to={"/"}
                className="h-8 w-8 p-1 bg-[#16151F] border-[1px] border-gray-800 flex justify-center items-center rounded-md hover:bg-[#323A96]"
              >
                <BiLogoFacebookSquare className="text-white text-xl" />
              </Link>
              <Link
                to={"/"}
                className="h-8 w-8 p-1 bg-[#16151F] border-[1px] border-gray-800 flex justify-center items-center rounded-md hover:bg-[#323A96]"
              >
                <BiLogoInstagramAlt className="text-white text-xl" />
              </Link>
              <Link
                to={"/"}
                className="h-8 w-8 p-1 bg-[#16151F] border-[1px] border-gray-800 flex justify-center items-center rounded-md hover:bg-[#323A96]"
              >
                <BiLogoGithub className="text-white text-xl" />
              </Link>
            </div>
            <p className="text-[#F4F4F5]">2023 © Shanto. All Right Reserved.</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
