import React, { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { MdClear } from "react-icons/md";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { MutatingDots } from "react-loader-spinner";

const SpeechBox = ({ setSpeechModal, sendAudio }) => {
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const [isUploading, setIsUploading] = useState(false);

  const addAudioElement = async (blob) => {
    const storage = getStorage();
    const storageRef = ref(storage, "uploaded/" + Date.now() + ".mp3");

    setIsUploading(true);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, blob, { contentType: "audio/mp3" }).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setSpeechModal(false);
          setIsUploading(false);

          sendAudio(url);
        });
      }
    );
  };

  return (
    <React.Fragment>
      <div
        style={{ zIndex: -100 }}
        className="w-full flex flex-col items-center justify-center p-[2000px]"
        onClick={() => setSpeechModal(false)}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-[350px]  flex justify-between p-3 rounded-md"
        >
          {!isUploading && (
            <AudioRecorder
              onRecordingComplete={(blob) => addAudioElement(blob)}
              recorderControls={recorderControls}
              // downloadOnSavePress={true}
              // downloadFileExtension="mp3"
              showVisualizer={true}
            />
          )}

          {isUploading && (
            <MutatingDots
              height="100"
              width="100"
              color="#4fa94d"
              secondaryColor="#4fa94d"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SpeechBox;
