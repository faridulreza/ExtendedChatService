import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const navbarItems = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 1,
    title: "Chatbot",
    url: "/chatbot",
  },
  {
    id: 2,
    title: "About",
    url: "/about",
  },
  {
    id: 3,
    title: "Contact",
    url: "/contact",
  },
];
const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [colorChange, setColorchange] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsub();
    };
  }, []);
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };

  window.addEventListener("scroll", changeNavbarColor);

  const handleSignOut = () => {
    getAuth().signOut();
    navigate("/signin");
  };
  return (
    <React.Fragment>
      <div
        className={`w-full flex justify-center items-center ${
          colorChange
            ? "bg-[#323A96] fixed delay-300 duration-300 z-50"
            : "bg-transparent"
        }`}
      >
        <div className="w-[65%] bg-transparent flex justify-between items-center p-5">
          <Link to={"/"} className="text-2xl font-bold text-[#F4F4F5]">
            ChatBot++
          </Link>
          <ul className="flex justify-start gap-x-10 items-center">
            {navbarItems.map((item) => (
              <li
                key={item.id}
                className={`text-[#F4F4F5] text-md hover:border-b-[1px] ${
                  pathname == item.url && "border-b-[1px]"
                }`}
              >
                <Link to={`${item.url}`}>{item.title}</Link>
              </li>
            ))}
            {!user ? (
              <Link
                to={"/signin"}
                className="text-[#F4F4F5] border-[1px] px-4 py-1 border-gray-800 hover:bg-[#323A96]"
              >
                Signin
              </Link>
            ) : (
              <button
                onClick={handleSignOut}
                className="  text-[#FF0000] first-letter: border-[1px] px-4 py-1 border-gray-800"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
