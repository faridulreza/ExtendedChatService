import React from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { MdClear } from "react-icons/md";

const SpeechBox = ({ setSpeechModal }) => {
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  return (
    <React.Fragment>
      <div className="w-[350px] flex flex-col items-center justify-center">
        <div className="w-full flex justify-end items-center">
          <MdClear
            onClick={() => setSpeechModal(false)}
            className="text-white relative left-4 text-xl cursor-pointer"
          />
        </div>
        <div className="w-full bg-white flex justify-between p-3 rounded-md">
          <AudioRecorder
            onRecordingComplete={(blob) => addAudioElement(blob)}
            recorderControls={recorderControls}
            // downloadOnSavePress={true}
            // downloadFileExtension="mp3"
            showVisualizer={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SpeechBox;
