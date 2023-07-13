import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast as tt } from "react-toastify";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase.js";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        var errorMessage = "";
        if (errorCode === "auth/user-not-found") {
          errorMessage = "User not found!";
        } else if (errorCode === "auth/wrong-password") {
          errorMessage = "Wrong password!";
        }
        tt.error(`${errorMessage}`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <React.Fragment>
      <div className="w-full h-screen flex justify-center items-start">
        <div className="w-[70%] flex justify-center items-center mt-20">
          <div className="w-full flex justify-end">
            <img src="/img/login.png" alt="" className="h-[60vh]" />
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-y-6"
          >
            <div className="w-full flex justify-center items-center">
              <span className="text-2xl font-bold text-[#F4F4F5]"> Login</span>
            </div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                borderTopLeftRadius: "25px",
                borderBottomRightRadius: "25px",
              }}
              className="bg-black p-4 w-[80%] text-[#F4F4F5] outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#323A96]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderTopLeftRadius: "25px",
                borderBottomRightRadius: "25px",
              }}
              className="bg-black p-4 w-[80%] text-[#F4F4F5] outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#323A96]"
            />
            <div
              onClick={handleGoogleLogin}
              style={{
                borderTopLeftRadius: "25px",
                borderBottomRightRadius: "25px",
              }}
              className="w-[80%] flex items-center justify-center border-[1px] p-2 hover:bg-gray-800 border-[#323A96] cursor-pointer"
            >
              <FcGoogle className="text-2xl" />
              <h1 className="text-white text-lg ml-2">Google</h1>
            </div>
            <div className="">
              <p className="text-sm text-[#F4F4F5]">
                Do not have any account? Go for{" "}
                <Link to="/signup" className="text-[#323A96]">
                  Signup
                </Link>{" "}
              </p>
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="text-[#F4F4F5] px-8 py-3 bg-[#323A96]"
              >
                Signin
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin;
