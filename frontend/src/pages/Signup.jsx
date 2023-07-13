import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase.js";
import { toast as tt } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, email, password });
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        auth.currentUser.displayName = name;
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            console.log(user.displayName);
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        var errorMessage = "";
        if (errorCode === "auth/email-already-in-use") {
          errorMessage = "Email already in use!";
        } else if (errorCode === "auth/invalid-email") {
          errorMessage = "Invalid email!";
        } else if (errorCode === "auth/weak-password") {
          errorMessage = "Weak password!";
        } else if (errorCode === "auth/operation-not-allowed") {
          errorMessage = "Operation not allowed!";
        }

        console.log(errorCode, errorMessage);
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

  const handleGoogleSignIn = async () => {
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
        <div className="w-[70%] flex justify-center items-center mt-10">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-y-6"
          >
            <div className="w-full flex justify-center items-center">
              <span className="text-2xl font-bold text-[#F4F4F5]">Signup</span>
            </div>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                borderTopLeftRadius: "25px",
                borderBottomRightRadius: "25px",
              }}
              className="bg-black p-4 w-[80%] text-[#F4F4F5] outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#323A96]"
            />
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
              onClick={handleGoogleSignIn}
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
                Have already an account? Go for
                <Link to="/signin" className="text-[#323A96] ml-2">
                  Signin
                </Link>
              </p>
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="text-[#F4F4F5] px-8 py-3 bg-[#323A96]"
              >
                Signup
              </button>
            </div>
          </form>
          <div className="w-full flex justify-start">
            <img src="/img/register.png" alt="" className="h-[60vh]" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin;
