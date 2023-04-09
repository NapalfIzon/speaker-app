"use client";
import "regenerator-runtime/runtime";

import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "./page.scss";

export default function Home() {
  const commands: ReadonlyArray<any> = [
    {
      command: "borrar",
      callback: () => {
        resetTranscript();
      },
    },
    ,
    {
      command: "detener",
      callback: () => {
        stopHandle();
      },
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] =
    useState(false);
  const microphoneRef = useRef<any>(null);

  useEffect(() => {
    const browserSupportsSpeechRecognition =
      SpeechRecognition.browserSupportsSpeechRecognition();
    setSpeechRecognitionSupported(browserSupportsSpeechRecognition);
  }, []);

  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current?.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current?.classList.remove("listening");
    SpeechRecognition.stopListening();
  };

  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

  const handleRead = () => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = transcript;
    utterance.lang = "ca";
    window.speechSynthesis.speak(utterance);
  };

  if (!speechRecognitionSupported) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  if (transcript.includes("detente")) {
    stopHandle();
  }

  if (transcript.includes("borrar")) {
    resetTranscript();
  }

  return (
    <main>
      <div className="microphone-wrapper">
        <div className="microphone-container">
          <div
            className="microphone-icon-container"
            ref={microphoneRef}
            onClick={handleListing}
          >
            <FontAwesomeIcon className="microphone-icon" icon={faMicrophone} />
          </div>
          <div className="microphone-status">
            {isListening ? "Listening........." : "Click to start Listening"}
          </div>
          {isListening ? (
            <Button
              className="microphone-stop btn"
              variant="danger"
              onClick={stopHandle}
            >
              Stop
            </Button>
          ) : null}
        </div>

        {transcript ? (
          <div className="microphone-result-container">
            <div className="microphone-result-text">{transcript}</div>
            <div className="microphone-result-buttons">
              <Button
                className="microphone-result-action_button btn"
                variant="success"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                className="microphone-result-action_button btn"
                variant="warning"
                onClick={handleRead}
              >
                Read text
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
