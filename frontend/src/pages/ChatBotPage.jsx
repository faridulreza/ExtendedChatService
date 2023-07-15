import { useQueries } from "react-query";
import ChatBotMain from "../components/Chatbot/ChatbotMain";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { async } from "regenerator-runtime";
import { addDoc, collection, getFirestore, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AiOutlinePlus } from "react-icons/ai";

const ChatBotPage = () => {
  const navigate = useNavigate();
  const [nowChatID, setNowChatID] = useState(null);

  const [allChats, setAllChats] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      let collc = collection(getFirestore(), getAuth().currentUser.uid);

      const querySnapshot = await getDocs(collc);
      const chats = [];
      querySnapshot.forEach((dc) => {
        chats.push({ chatID: dc.id, name: dc.get("name") });
      });

      setAllChats(chats);
    };

    getAll();
  });

  if (getAuth().currentUser === null) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <button
          onClick={() => navigate("/signin")}
          className="bg-gray-700 text-gray-300 px-5 py-3 rounded-md text-lg"
        >
          Login to chat
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex justify-start items-start gap-x-1 px-8 py-2">
      <div className="h-[85vh] mt-6 rounded-lg flex flex-col bg-gray-800 w-[20%]">
        <button
          onClick={async () => {
            let cllc = collection(getFirestore(), getAuth().currentUser.uid);
            let doc = await addDoc(cllc, {
              name: "Unnamed Chat",
            });
            setNowChatID(doc.id);

            setAllChats([
              ...allChats,
              { chatID: doc.id, name: "Unnamed Chat" },
            ]);
          }}
          className="bg-gray-600 text-xl flex justify-center items-center text-gray-200 rounded-md py-2 hover:bg-gray-500"
        >
          <AiOutlinePlus className="text-md" />
          <span>New</span>
        </button>
        <ul className="text-gray-300 overflow-y-scroll flex flex-col">
          {allChats.map((a, i) => {
            return (
              <li
                key={i}
                onClick={() => setNowChatID(a.chatID)}
                className={`px-3 py-2 ${
                  a.chatID == nowChatID && "bg-[#2a5568]"
                } border-[1px] border-gray-600 hover:bg-gray-700 rounded-md`}
              >
                {a.name}
              </li>
            );
          })}
        </ul>
      </div>
      <ChatBotMain chatID={nowChatID} />
    </div>
  );
};

export default ChatBotPage;
