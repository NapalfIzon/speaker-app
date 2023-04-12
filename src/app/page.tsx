"use client";
import "regenerator-runtime/runtime";

import { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Placeholder, DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { Language, LanguageNames, translation } from "./language/languages";

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
    {
      command: "detener",
      callback: () => {
        stopHandle();
      },
    },
  ];
  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>({
    language: "es",
    isSelected: false,
  });
  const translations = translation[language.language];
  const [speechRecognitionSupported, setSpeechRecognitionSupported] =
    useState(false);
  const microphoneRef = useRef<any>(null);
  const languageTypes = Object.keys(LanguageNames);
  const languageName =
    Object.values(LanguageNames)[languageTypes.indexOf(language.language)];

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
      language: language.language,
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
    utterance.lang = language.language;
    utterance.rate = 0.75;
    window.speechSynthesis.speak(utterance);
  };

  const handleLanguage = (event: any): void => {
    if (event.target.id.length > 0) {
      handleReset();

      setLanguage({ language: event.target.id, isSelected: true });
    }
  };

  if (!speechRecognitionSupported) {
    return (
      <div className="microphone-container">
        <Placeholder.Button variant="secondary" xs={3} />
        <Placeholder
          as="div"
          className="microphone-icon-container"
          animation="wave"
        />
        <Placeholder as="div" className="microphone-status" animation="wave">
          <Placeholder xs={12} bg="light" />
        </Placeholder>
      </div>
    );
  }

  if (transcript.includes(translations.stop)) {
    stopHandle();
  }

  if (transcript.includes(translations.reset)) {
    resetTranscript();
  }

  return (
    <main>
      <div className="microphone-wrapper">
        <div className="microphone-container">
          <DropdownButton
            className="microphone-language"
            drop="down-centered"
            variant="secondary"
            title={
              language.isSelected ? languageName : translations.languageSelector
            }
            onClick={handleLanguage}
          >
            {languageTypes.map((languageId, index) => {
              const languageIndex =
                Object.keys(LanguageNames).indexOf(languageId);
              const languageName = Object.values(LanguageNames)[languageIndex];

              return (
                <Dropdown.Item key={index} id={languageId}>
                  {languageName}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
          <div
            className="microphone-icon-container"
            ref={microphoneRef}
            onClick={handleListing}
          >
            <FontAwesomeIcon className="microphone-icon" icon={faMicrophone} />
          </div>
          <div className="microphone-status">
            {isListening
              ? translations.listening
              : translations.readyToListening}
          </div>
          {isListening ? (
            <Button
              className="microphone-stop btn"
              variant="danger"
              onClick={stopHandle}
            >
              {translations.stop}
            </Button>
          ) : null}
        </div>

        {transcript ? (
          <div className="microphone-result-container">
            <div className="microphone-result-text">{transcript}</div>
            <div className="microphone-result-buttons">
              <Button
                className="microphone-result-action_button btn"
                variant={isListening ? "secondary" : "success"}
                disabled={isListening}
                onClick={handleReset}
              >
                {translations.reset}
              </Button>
              <Button
                className="microphone-result-action_button btn"
                variant={isListening ? "secondary" : "warning"}
                disabled={isListening}
                onClick={handleRead}
              >
                {translations.read}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
