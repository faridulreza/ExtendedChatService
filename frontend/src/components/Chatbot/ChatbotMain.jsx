import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import SpeechBox from "./SpeechBox";
import UserMessageBody from "./UserMessageBody";
import AIMessageBody from "./AIMessageBody";
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import axios from "axios";
const BACKEND_URL = "http://localhost:3000/api/v1";

const getPreviousMessages = (chatData) => {
  let dataArr = [...chatData];
  let prevs = [];
  for (let i = dataArr.length - 1, cnt = 0; i >= 0 && cnt < 6; i--) {
    if (!dataArr[i].generatedFile && dataArr[i].content) {
      prevs.unshift({ role: dataArr[i].role, content: dataArr[i].content });
      cnt++;
    }
  }
  return prevs;
};
const ChatBotMain = ({ chatID }) => {
  const [chatData, setChatData] = useState([]);
  const [typedText, setTypedText] = useState("");
  const [speechModal, setSpeechModal] = useState(false);
  const [apiCallData, setApiCallData] = useState(null);

  const [pic, setPic] = useState();

  useEffect(() => {
    const getData = async () => {
      const dc = doc(getFirestore(), getAuth().currentUser.uid + "/" + chatID);
      let m_doc = await getDoc(dc);
      let data = m_doc.data();
      let dataArr = [];

      Object.keys(data).forEach((n, i) => {
        if (n === "name") return;
        dataArr.push({
          timestamp: n,
          ...data[n],
        });
      });

      dataArr.sort((a, b) => a.timestamp - b.timestamp);

      setChatData(dataArr);
    };

    if (chatID) {
      getData();
    }
  }, []);

  const sendText = async (e) => {
    let newObj = {
      timestamp: Date.now(),
      role: "user",
      content: typedText,
    };

    setChatData([
      ...chatData,
      newObj,
      {
        timestamp: newObj.timestamp + 1,
        role: "assistant",
        lookForUpdate: true,
        updatePath:
          getAuth().currentUser.uid + "/" + chatID + "/" + newObj.timestamp,
      },
    ]);
    setTypedText("");

    await axios.post(
      BACKEND_URL + "/chat",
      {
        chatID,
        timestamp: newObj.timestamp,
        prevMessage: getPreviousMessages(chatData),
        text: newObj.content,
      },
      {
        headers: {
          Authorization: "bearer " + (await getAuth().currentUser.getIdToken()),
        },
      }
    );

    const cont = document.getElementById("overflowBar");
    cont.scrollTop = cont.scrollHeight + 1000;

    //add the message to database

    const dc = doc(getFirestore(), getAuth().currentUser.uid + "/" + chatID);

    await updateDoc(dc, {
      [newObj.timestamp]: {
        role: "user",
        content: newObj.content,
      },
    });
  };

  const picDetails = async (pics) => {
    if (pics === undefined) {
      alert("Use proper type Images.");
      return;
    }
    try {
      if (
        pics.type === "image/jpeg" ||
        pics.type === "image/png" ||
        pic.type === "pdf" ||
        pic.type === "txt"
      ) {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "shanto78");
        // const imgData = await axios.post(
        //   "https://api.cloudinary.com/v1_1/shanto78/image/upload",
        //   data
        // );
        // setPic(imgData.data.url.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {speechModal && (
        <Modal>
          <SpeechBox setSpeechModal={setSpeechModal} />
        </Modal>
      )}

      <div className="w-full h-screen flex justify-center items-start">
        <div className="w-min-[70%] flex justify-center items-center">
          <div className="flex h-[90vh] antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
              <div className="flex flex-col flex-auto h-full p-6">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-800 h-full p-4">
                  <div
                    className="flex flex-col h-full overflow-x-auto  mb-4"
                    id="overflowBar"
                  >
                    <div className="flex flex-col h-full">
                      <div className="grid grid-cols-12 gap-y-2">
                        {!chatID && (
                          <div style={{ width: "100%" }}>
                            <p className="text-white">No Chat Selected</p>
                          </div>
                        )}

                        {chatData.map((d, i) => {
                          if (d.role === "user")
                            return (
                              <UserMessageBody key={d.timestamp} data={d} />
                            );
                          else
                            return (
                              <AIMessageBody
                                key={d.timestamp}
                                chatID={chatID}
                                setChatData={setChatData}
                                data={d}
                                update={(d) => {
                                  let tmp = [...chatData];
                                  tmp[i] = d;
                                  setChatData(tmp);
                                }}
                              />
                            );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center h-16 rounded-xl bg-gray-700 w-full px-4">
                    <div className="flex items-center gap-x-2">
                      <div className="flex items-center justify-center w-full">
                        <label className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                          <div className="flex flex-col items-center justify-center">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                              ></path>
                            </svg>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={(e) => picDetails(e.target.files[0])}
                          />
                        </label>
                      </div>
                      <button
                        onClick={() => {
                          setSpeechModal(true);
                        }}
                        className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                          />
                        </svg>
                      </button>
                      <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-grow ml-4">
                      <div className="relative w-full">
                        <input
                          disabled={!chatID}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") sendText();
                          }}
                          value={typedText}
                          onChange={(e) => {
                            setTypedText(e.target.value);
                          }}
                          type="text"
                          className="flex w-full border bg-gray-500 text-white text-lg rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        />
                        <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={sendText}
                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                      >
                        <span>Send</span>
                        <span className="ml-2">
                          <svg
                            className="w-4 h-4 transform rotate-45 -mt-px"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatBotMain;
