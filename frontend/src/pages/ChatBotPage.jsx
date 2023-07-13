import { useQueries } from "react-query";
import ChatBotMain from "../components/Chatbot/ChatbotMain";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { async } from "regenerator-runtime";
import { addDoc, collection, getFirestore, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ChatBotPage = () => {
  const [nowChatID, setNowChatID] = useState(null);

  if (getAuth().currentUser === null) {
    return <center>Please login to chat</center>;
  }

  return (
    <div className="h-screen">
      <button
        onClick={async () => {
          let cllc = collection(getFirestore(), getAuth().currentUser.uid);
          let doc = await addDoc(cllc, {
            name: "Unnamed Chat",
          });
          setNowChatID(doc.id);
        }}
      >
        + New
      </button>
      <ChatBotMain chatID={nowChatID} />
    </div>
  );
};

export default ChatBotPage;
