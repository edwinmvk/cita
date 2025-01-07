// "use client";

// import "regenerator-runtime";
// import React, { useEffect, useState, useCallback } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { SendHorizontal } from "lucide-react";
// import MicWithTranscript from "./MicWithTranscript";
// import TalkingAvatar from "./TalkingAvatar";
// import WebCamera from "./WebCamera";
// import { playVoice } from "./TextToSpeech";

// type Props = {
//   user: string | null;
// };

// export default function Interview({ user }: Props) {
//   const { transcript, resetTranscript } = useSpeechRecognition();
//   const router = useRouter();

//   const [isLoading, setIsLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [questions, setQuestions] = useState<string[]>([]);
//   const [index, setIndex] = useState<number>(0);
//   const initialTime: number = 600; // 10 minutes converted to seconds
//   const [time, setTime] = useState<number>(initialTime);
//   const [startSession, setStartSession] = useState<boolean>(false);
//   const [userInput, setUserInput] = useState<string>("");
//   const [userInputs, setUserInputs] = useState<string[]>([]);
//   const [isListeningDisabled, setIsListeningDisabled] =
//     useState<boolean>(false);
//   const [emotionValues, setEmotionValues] = useState({
//     angry: 0,
//     sad: 0,
//     neutral: 0,
//     happy: 0,
//     surprised: 0,
//   });
//   const [totalDetectionTime, setTotalDetectionTime] = useState<number>(0);

//   useEffect(() => {
//     let timer: NodeJS.Timeout;

//     if (startSession && questions.length > 0 && time > 0) {
//       timer = setInterval(() => {
//         setTime((prevTime) => prevTime - 1);
//       }, 1000);
//     }

//     return () => {
//       clearInterval(timer);
//     };
//   }, [startSession, time, questions]);

//   const fetchQuestions = useCallback(async () => {
//     const info = {
//       resume: window.sessionStorage.getItem("resume"),
//       job: window.sessionStorage.getItem("job"),
//     };

//     try {
//       const response = await fetch("/api/questions", {
//         method: "POST",
//         body: JSON.stringify(info),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch questions");
//       }

//       const res = await response.json();
//       setQuestions(res.questions);
//       window.sessionStorage.setItem("interviewId", res.interviewId);

//       setIsListeningDisabled(true);
//       await playVoice(res.questions[index], () => {
//         console.log("stop");
//         setIsListeningDisabled(false);
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   }, [index]);

//   const evaluateScore = useCallback(async () => {
//     setIsLoading(true);
//     const info = {
//       interviewId: window.sessionStorage.getItem("interviewId"),
//       userInputs: [...userInputs, userInput],
//       emotionValues: emotionValues,
//       totalDetectionTime: totalDetectionTime,
//     };

//     try {
//       const response = await fetch("/api/evaluatescore", {
//         method: "POST",
//         body: JSON.stringify(info),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to evaluate score");
//       }
//       onEndSession();
//     } catch (error) {
//       console.error(error);
//     }
//   }, [userInput, userInputs]);

//   const formatTime = useCallback((seconds: number): string => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${String(minutes).padStart(2, "0")}:${String(
//       remainingSeconds
//     ).padStart(2, "0")}`;
//   }, []);

//   const handleSessionChange = useCallback(() => {
//     SpeechRecognition.stopListening();
//     resetTranscript();

//     if (startSession) {
//       setIsModalOpen(true);
//     } else {
//       setStartSession(true);
//       fetchQuestions();
//     }
//   }, [fetchQuestions, resetTranscript, startSession]);

//   const onEndSession = useCallback(() => {
//     setIsListeningDisabled(false);
//     setIsModalOpen(false);
//     setStartSession(false);
//     setTime(initialTime);
//     setQuestions([]);
//     setUserInputs([]);
//     setUserInput("");
//     setIndex(0);
//     router.push("/result/" + window.sessionStorage.getItem("interviewId"));
//   }, [initialTime]);

//   const handleClear = useCallback(() => {
//     SpeechRecognition.stopListening();
//     resetTranscript();
//   }, [resetTranscript]);

//   const handleSend = useCallback(async () => {
//     setIsListeningDisabled(true);
//     setUserInputs([...userInputs, userInput]);
//     handleClear();

//     if (index < questions.length - 1) {
//       await playVoice(questions[index + 1], () => {
//         console.log("stop");
//         setIsListeningDisabled(false);
//       });
//       setIndex((prevIndex) => prevIndex + 1);
//     } else {
//       evaluateScore();
//     }
//   }, [
//     evaluateScore,
//     handleClear,
//     index,
//     onEndSession,
//     questions,
//     userInput,
//     userInputs,
//   ]);

//   return (
//     <section className="min-h-screen bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-100">
//       <div className="flex flex-row p-5 gap-4">
//         <div className="w-1/4 p-4 border-2 rounded-2xl bg-zinc-50">
//           <div className="grid grid-cols-1 h-full">
//             <h2 className="font-[1000] text-[50px]">Hello {user},</h2>
//             <p className="text-xl">
//               You are being interviewed <br />
//               <span className="font-black text-left text-[40px] text-purple-800 leading-10">
//                 Now
//               </span>
//             </p>
//             <div>
//               <h3 className="font-semi-bold text-lg">Time elapsed:</h3>
//               <h4 className="font-black text-[50px]">{formatTime(time)}</h4>
//             </div>
//             <button
//               className={`p-3 ${
//                 startSession ? `bg-red-500` : `bg-green-500 hover:bg-red-400`
//               } transition duration-300 text-white rounded-full`}
//               onClick={handleSessionChange}
//             >
//               {startSession ? "End Session" : "Start Session"}
//             </button>
//           </div>
//         </div>
//         <div className="flex flex-col w-full border-2 rounded-2xl bg-white p-4 gap-y-2">
//           <div className="flex gap-x-2">
//             <div className="relative h-[450px] w-2/3 bg-gray-100 rounded-2xl overflow-hidden">
//               <TalkingAvatar isUserSpeaking={isListeningDisabled} />
//               <div className="absolute min-h-[50px] h-fit bottom-0 text-center w-full backdrop-blur-md bg-gray-50/50 p-4">
//                 <p>{questions[index] || ""}</p>
//               </div>
//             </div>
//             <div className="h-[450px] w-1/3 bg-gray-100 rounded-2xl flex flex-col overflow-hidden">
//               <div className="relative h-4/5 flex items-center justify-center">
//                 <WebCamera
//                   setTotalDetectionTime={setTotalDetectionTime}
//                   setEmotionValues={setEmotionValues}
//                 />
//               </div>
//               <div className="flex items-center justify-center grow gap-x-5"></div>
//             </div>
//           </div>
//           <div className="grid grid-cols-12 gap-x-2">
//             <div className="col-span-11 w-full">
//               <MicWithTranscript
//                 setUserInput={setUserInput}
//                 transcript={transcript}
//                 resetTranscript={resetTranscript}
//                 SpeechRecognition={SpeechRecognition}
//                 isListeningDisabled={isListeningDisabled}
//               />
//             </div>
//             <div className="flex col-span-1s justify-center items-center">
//               <button
//                 className="h-11 w-11 flex justify-center items-center bg-zinc-500 hover:bg-zinc-700 transition duration-300 rounded-full text-white"
//                 onClick={handleSend}
//               >
//                 <SendHorizontal absoluteStrokeWidth />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Dialog
//         open={isModalOpen}
//         onOpenChange={(vis: boolean) => {
//           if (!vis) {
//             setIsModalOpen(vis);
//           }
//         }}
//       >
//         <DialogContent className="w-2/3">
//           <DialogHeader>
//             <DialogTitle>End Session</DialogTitle>
//             <DialogDescription>
//               Do you want to end the session ?
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button
//               onClick={() => {
//                 setIsModalOpen(false);
//               }}
//               className={buttonVariants({
//                 size: "lg",
//                 // variant: "custom1",
//                 className: "mt-5 rounded-xl",
//               })}
//             >
//               Cancel
//             </Button>
//             <Link
//               href="/result"
//               className={buttonVariants({
//                 size: "lg",
//                 variant: "default",
//                 className: "mt-5 rounded-xl",
//               })}
//             >
//               End
//             </Link>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import { Camera, CameraOff, Mic, MicOff, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import DraggableDiv from "@/app/(pages)/interview/components/DraggableDiv";

type Props = {
  user: string | null;
};

export default function Interview({ user }: Props) {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  return (
    <section className="h-[calc(100vh-80px)] py-4 bg-gradient-to-br from-pink-50 to-blue-50">
      <DraggableDiv />
      <div className="h-full mx-4 grid gap-6 grid-cols-3 grid-rows-10">
        {/* Left Panel */}

        <div className="col-span-3 lg:col-span-2 row-span-8 rounded-xl bg-gray-100 p-6 shadow-lg">
          <div>{/* Place VRM model */}</div>
        </div>

        {/* Right Panel */}
        <div className="col-span-3 lg:col-span-1 row-span-8 space-y-6 rounded-xl bg-white p-6 shadow-lg">
          <div className="flex lg:flex-col items-center justify-around">
            <div className="h-2/3">{/* Webcam */}Webcam</div>

            <div className="flex flex-col sm:flex sm:flex-row gap-4">
              <Button
                variant="secondary"
                size="icon"
                className={`rounded-full ${
                  isCameraOn
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
                onClick={() => setIsCameraOn(!isCameraOn)}
              >
                {isCameraOn ? (
                  <Camera className="h-5 w-5" />
                ) : (
                  <CameraOff className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className={`rounded-full ${
                  isMicOn
                    ? "bg-gray-700 text-white hover:bg-gray-800"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
                onClick={() => setIsMicOn(!isMicOn)}
              >
                {isMicOn ? (
                  <Mic className="h-5 w-5" />
                ) : (
                  <MicOff className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-gray-700 text-white hover:bg-gray-800"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom panel */}
        <div className="col-span-3 row-span-2 border-2 bg-gray-50 rounded-xl p-3 shadow-lg overflow-y-scroll">
          sfkfkdf fijfdfdofdsfj foasdfsdafkdspfksd fdsof'soff sefsfew awerf
          aawserawrewrwrerewrerewrtewraewreaw
        </div>
      </div>
    </section>
  );
}
