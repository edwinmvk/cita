"use client";

import { useState } from "react";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  StickyNote,
  BookOpenText,
  ExternalLink,
  GalleryVerticalEnd,
  RefreshCcw,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Setup() {
  const [file1, setFile1] = useState<string>("");
  const [file2, setFile2] = useState<string>("");
  const [flag, setFlag] = useState<Boolean>(true);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isFileUpload, setIsFileUpload] = useState(true);
  const [tempFile1, setTempFile1] = useState<string>("");
  const [tempFile2, setTempFile2] = useState<string>("");

  const openResumeModal = () => setIsResumeModalOpen(true);
  const openJobModal = () => setIsJobModalOpen(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    const fileReader = new FileReader();

    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      const content = event.target?.result as string;
      if (flag) {
        setFile1(content);
        window.sessionStorage.setItem("resume", content);
        setFlag(!flag);
      } else {
        setFile2(content);
        window.sessionStorage.setItem("job", content);
        setFlag(!flag);
      }
    };

    if (files && files.length > 0) {
      fileReader.readAsText(files[0]);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === "resume") {
      setTempFile1(value);
    } else {
      setTempFile2(value);
    }
  };

  const handleConfirm = () => {
    setFile1(tempFile1);
    setFile2(tempFile2);
    window.sessionStorage.setItem("resume", tempFile1);
    window.sessionStorage.setItem("job", tempFile2);
  };

  const uploadAgain = () => {
    setFile1("");
    setFile2("");
    setTempFile1("");
    setTempFile2("");
    setIsFileUpload(true);
    window.sessionStorage.removeItem("resume");
    window.sessionStorage.removeItem("job");
  };

  return (
    <MaxWidthWrapper>
      <div className="my-10 grid grid-cols-1 gap-8">
        {/* Heading */}

        <div className="flex flex-col items-start justify-between gap-4 xs:flex-row xs:items-center sm:gap-0">
          <h2 className="font-semibold text-gray-900 leading-loose">
            Getting ready to <br />
            <span className="text-3xl font-bold">Setup Interview</span>
          </h2>
        </div>

        {/*  Preview Buttons*/}

        <div className="flex gap-x-24 justify-center">
          <div className="flex flex-col gap-y-3 items-center">
            <div
              className={`w-20 h-20 text-4xl text-white shadow-lg ${
                file1 ? "bg-green-700" : "bg-red-500"
              } rounded-full flex text-center items-center justify-center`}
            >
              <StickyNote size={24} />
            </div>
            <Dialog
              open={isResumeModalOpen}
              onOpenChange={setIsResumeModalOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!file1}
                  onClick={openResumeModal}
                >
                  <ExternalLink
                    className={file1 ? `cursor-pointer` : `cursor-not-allowed`}
                  />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Resume Content</DialogTitle>
                </DialogHeader>
                <DialogDescription className="whitespace-pre-wrap">
                  {file1}
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col gap-y-3 items-center">
            <div
              className={`w-20 h-20 text-4xl text-white shadow-lg ${
                file2 ? "bg-green-700" : "bg-red-500"
              } rounded-full flex text-center items-center justify-center`}
            >
              <BookOpenText size={24} />
            </div>
            <Dialog open={isJobModalOpen} onOpenChange={setIsJobModalOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!file2}
                  onClick={openJobModal}
                >
                  <ExternalLink
                    className={file2 ? `cursor-pointer` : `cursor-not-allowed`}
                  />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Job Description Content</DialogTitle>
                </DialogHeader>
                <DialogDescription className="whitespace-pre-wrap">
                  {file2}
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Toggle switch */}

        {file1 || file2 ? null : (
          <div className="flex items-center justify-center space-x-2">
            <Label htmlFor="file-mode">File Upload</Label>
            <Switch
              id="file-mode"
              checked={!isFileUpload}
              onCheckedChange={() => setIsFileUpload(!isFileUpload)}
            />
            <Label htmlFor="file-mode">Text Input</Label>
          </div>
        )}

        {/* File Input or Textarea based on toggle */}

        {file1 && file2 ? (
          <h3 className="my-4 text-center text-xl text-gray-400 ">
            You are all set to start the interview.
          </h3>
        ) : isFileUpload ? (
          <div className="flex justify-center items-center">
            <div className="relative w-3/4 p-4 m-4 flex flex-col text-gray-400 border-dotted border-2 border-gray-500 rounded-2xl cursor-pointer">
              <input
                // we are adding the key to the input element to force it to re-render on each click
                key={flag ? "input1" : "input2"}
                accept=".txt"
                type="file"
                multiple={false}
                className="absolute inset-0 w-full h-full outline-none opacity-0 cursor-pointer"
                onChange={handleChange}
              />
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <GalleryVerticalEnd size={70} />
                <h2 className="text-xl my-4">
                  {flag
                    ? "Upload your resume to get started"
                    : "Upload the job description to get started"}
                </h2>
                <p className="text-2xl font-bold mb-2 p-1 bg-none">
                  {flag ? "Upload your resume" : "Upload your job description"}
                </p>
                <p>as .txt</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <Textarea
              placeholder="Paste your resume here"
              name="resume"
              value={tempFile1}
              onChange={handleTextChange}
              className="min-h-[200px] p-2 resize-none border-solid border-2 border-gray-200 rounded-md focus:border-none"
            />
            <Textarea
              placeholder="Paste the job description here"
              name="job"
              value={tempFile2}
              onChange={handleTextChange}
              className="min-h-[200px] p-2 resize-none border-solid border-2 border-gray-200 rounded-md focus:border-none"
            />
            <Button
              onClick={tempFile1 && tempFile2 ? handleConfirm : () => {}}
              className={
                tempFile1 && tempFile2
                  ? "mt-4 cursor-pointer"
                  : "mt-4 cursor-not-allowed"
              }
              variant="secondary"
            >
              Confirm
            </Button>
          </div>
        )}

        {/* Upload Again Button */}

        {file1 && file2 ? (
          <div className="flex justify-center">
            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer"
              onClick={uploadAgain}
            >
              Upload again
              <RefreshCcw />
            </Button>
          </div>
        ) : null}

        {/* Start Interview Button */}

        <div className="flex justify-center">
          <Link
            href={file1 && file2 ? "/interview" : ""}
            className={buttonVariants({
              size: "lg",
              variant: "default",
              className: `${
                file1 && file2 ? "cursor-pointer" : "cursor-not-allowed"
              }`,
            })}
          >
            Start Interview
            <ExternalLink />
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
