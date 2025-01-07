"use client";

import "regenerator-runtime";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { MessageCircleOff, Mic, MicOff } from "lucide-react";

type Props = {
  setUserInput: (value: string) => void;
  transcript: string;
  resetTranscript: () => void; // Change to correct type
  SpeechRecognition: any; // Change to correct type if possible
  isListeningDisabled: boolean;
};

export default function MicWithTranscript({
  setUserInput,
  transcript,
  resetTranscript,
  SpeechRecognition,
  isListeningDisabled,
}: Props) {
  const [micOn, setMicOn] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [transcript]);

  const handleVoice = useCallback(() => {
    if (!micOn) {
      setMicOn(true);
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
      });
    } else {
      setMicOn(false);
      setUserInput(transcript);
      SpeechRecognition.stopListening();
    }
  }, [micOn, transcript, SpeechRecognition, setUserInput]);

  const handleClear = useCallback(() => {
    SpeechRecognition.stopListening();
    resetTranscript();
    setMicOn(false);
  }, [resetTranscript, SpeechRecognition]);

  return (
    <div>
      <div className="w-full h-20 border-2 bg-gray-50 rounded-3xl p-3 overflow-y-hidden grid grid-cols-12">
        <div className="col-span-10 overflow-y-auto" ref={divRef}>
          {transcript}
        </div>
        <button
          className="bottom-0 bg-red-400 hover:bg-red-500 transition duration-300 h-11 w-11 rounded-full flex justify-center items-center"
          onClick={handleVoice}
          disabled={isListeningDisabled}
        >
          {micOn ? <Mic absoluteStrokeWidth /> : <MicOff absoluteStrokeWidth />}
        </button>
        <button
          className="h-11 w-11 flex justify-center items-center bg-zinc-500 hover:bg-zinc-700 transition duration-300 rounded-full text-white"
          onClick={handleClear}
        >
          <MessageCircleOff />
        </button>
      </div>
    </div>
  );
}
