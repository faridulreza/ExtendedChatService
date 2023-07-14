import React, { useEffect, useState } from "react";

import { getDatabase, onValue, ref, remove, update } from "firebase/database";
import { LineWave, FallingLines } from "react-loader-spinner";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import FileViewer from "./FileViewer";

const ERROR_FILE_PROSESSING = -1001;
const ERROR_GETTING_CHAT_RESPONSE = -1002;
const ALL_DONE = 1003;
const FILE_GENERATING = 1004;
const PROCESSING_FILE = 1005;

const HandleLoading = ({ data }) => {
  if (data === null || data == undefined) {
    return (
      <LineWave
        height="80"
        width="80"
        color="red"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    );
  }

  if (data.code === PROCESSING_FILE || data.code == FILE_GENERATING) {
    return (
      <div>
        {data.message}
        <br></br>
        <FallingLines
          color="white"
          width="100"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
      </div>
    );
  }

  return null;
};

const HandleData = ({ data, chatID, update }) => {
  const [msg, setMsg] = useState(data.message);
  const [isGenFile, setIsGenFile] = useState(false);
  const [playedOnce, setPlayedOnce] = useState(false);
  console.log(data);

  useEffect(() => {
    const doIt = async () => {
      if (!data.lookForUpdate) return;

      update({ ...data, lookForUpdate: false, content: data.message });

      const m_dc = doc(
        getFirestore(),
        getAuth().currentUser.uid + "/" + chatID
      );
      let obj = {};
      let now_time = Date.now();

      obj[now_time] = {
        role: "assistant",
        content: data.message,
      };

      if (data.file) {
        obj[now_time].file = data.file;
        obj[now_time].fileType = data.fileType;
      }

      if (data.file) {
        obj.generatedFile = true;
        setIsGenFile(true);
      }

      await updateDoc(m_dc, obj);
      const rf = ref(getDatabase(), data.updatePath);
      await remove(rf);
    };
    doIt();
  }, []);

  const tmsg = new SpeechSynthesisUtterance();
  tmsg.text = msg;

  useEffect(() => {
    if (playedOnce) return;
    if (!data.lookForUpdate) return;
    if (!data.tts) return;
    window.speechSynthesis.speak(tmsg);
    setPlayedOnce(true);
    tmsg.text = "";
  }, [tmsg, playedOnce]);

  return (
    <div>
      {data.file && <FileViewer file={data.file} fileType={data.fileType} />}
      {!isGenFile && <div style={{ whiteSpace: "pre-line" }}>{msg}</div>}
    </div>
  );
};

const SomeThingWentWrong = ({ data, update, index }) => {
  useEffect(() => {
    const doIt = async () => {
      if (!data.lookForUpdate) return;

      update({ ...data, lookForUpdate: false, content: data.message });

      const rf = ref(getDatabase(), data.updatePath);
      await remove(rf);
    };
    doIt();
  }, []);

  return (
    <div style={{ color: "red", whiteSpace: "pre-line" }}>{data.message}</div>
  );
};

const AIMessageBody = ({ data, chatID, update }) => {
  const [statData, setStatData] = useState(null);

  useEffect(() => {
    let unsub = () => {};

    if (data.lookForUpdate) {
      const rf = ref(getDatabase(), data.updatePath);
      unsub = onValue(rf, (snap) => {
        if (snap.exists()) {
          const m_val = snap.val();
          setStatData(m_val);
        }
      });
    } else if (statData == null) {
      setStatData({ code: ALL_DONE });
    }

    return () => unsub();
  }, []);

  return (
    <div className=" col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          AI
        </div>
        <div className="relative ml-3 text-md bg-indigo-300 py-2 px-4 shadow rounded-xl">
          <HandleLoading data={statData} />

          {statData && statData.code === ALL_DONE && (
            <HandleData
              data={{ ...statData, ...data }}
              chatID={chatID}
              update={update}
            />
          )}

          {statData && statData.code < 0 && (
            <SomeThingWentWrong
              data={{ ...statData, ...data }}
              update={update}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const SimpleAI = ({ data }) => {
  return (
    <div className=" col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          AI
        </div>
        <div className="relative ml-3 text-md bg-indigo-300 py-2 px-4 shadow rounded-xl">
          {data.file && (
            <FileViewer file={data.file} fileType={data.fileType} />
          )}
          {!data.file && (
            <div style={{ whiteSpace: "pre-line" }}>{data.content}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIMessageBody;
