"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Ghost, Loader2, Plus, Trash } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { format } from "date-fns";
import LineChart from "./LineChart";

type InterviewData = {
  id: string;
  jobTitle: string;
  createdAt: Date;
  totalScore: number;
};

type Props = {
  interviews: InterviewData[];
};

export default function DashboardComponent({ interviews }: Props) {
  const [currentDeletingFile, setCurrentDeletingFile] = useState<string | null>(
    null
  );

  const scoreList = interviews.map((interview) => interview.totalScore);

  const router = useRouter();

  const DisplayFiles: React.FC = () => {
    return (
      <ul className="my-2 p-3 grid gap-6 grid-cols-2 lg:grid-cols-3 border-2 shadow-lg rounded-lg">
        {interviews
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 3)
          .map((file) => (
            <li
              key={file.id}
              className="flex flex-col divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg border border-1 border-gray-100"
            >
              <div
                className="pt-6 px-6 flex w-full items-center justify-between space-x-6 cursor-pointer"
                onClick={() => router.push(`\\result\\${file.id}`)}
              >
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-zinc-200 to-neutral-200" />
                <div className="flex-1 text-ellipsis overflow-hidden">
                  {/* "text-ellipsis overflow-hidden" is same as "truncate" */}
                  <h3 className="text-lg font-medium text-zinc-900 truncate">
                    {file.jobTitle}
                  </h3>
                </div>
              </div>

              <div className="px-6 mt-4 grid grid-cols-2 place-items-center py-2 gap-6 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  {format(new Date(file.createdAt), "MMM yyyy")}
                </div>

                <Button
                  onClick={() => null}
                  size="sm"
                  className="w-full"
                  variant="destructive"
                >
                  {currentDeletingFile === file.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </li>
          ))}

        <Link
          className={`${buttonVariants({
            size: "sm",
            variant: "ghost",
          })} place-self-center lg:place-self-start`}
          href="/records"
        >
          See all...
        </Link>
      </ul>
    );
  };

  const DisplayEmpty: React.FC = () => {
    return (
      <div className="mt-16 flex flex-col items-center gap-2 text-zinc-400 select-none">
        <Ghost className="h-8 w-8 text-zinc-400" />
        <h3 className="font-semibold text-xl">Pretty empty around here</h3>
        <p>Lets&apos;s try out a mock session.</p>
        <br />
        <p>
          Click on the{" "}
          <span className="font-bold text-gray-600">Start Practicing</span>{" "}
          button in the Dashboard.
        </p>
      </div>
    );
  };

  return (
    <MaxWidthWrapper>
      <div className="my-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          className={
            interviews && interviews.length !== 0
              ? "lg:col-span-2"
              : "lg:col-span-3"
          }
        >
          <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 xs:flex-row xs:items-center sm:gap-0">
            <h2 className="mb-3 font-semibold text-gray-900 leading-loose">
              Good morning, welcome to <br />
              <span className="text-3xl font-bold">My Dashboard</span>
            </h2>
            <Link
              href="/setup"
              className={buttonVariants({
                size: "lg",
                variant: "default",
                className: "rounded-xl",
              })}
            >
              Start practicing
            </Link>
          </div>

          {/* Charts */}
          {interviews && interviews.length !== 0 ? (
            <>
              <h2 className="my-6 font-semibold text-gray-900 text-lg">
                Overview
              </h2>
              <LineChart scores={scoreList} />
            </>
          ) : null}
        </div>

        {interviews && interviews.length !== 0 ? (
          <>
            {/* This calender renders in large and small screen */}
            <div className="hidden lg:block max-sm:block place-self-center lg:place-self-end max-sm:mt-10">
              <Calendar
                mode="single"
                className="rounded-md border"
                numberOfMonths={1}
                styles={{
                  caption: { color: "purple" },
                }}
              />
            </div>
            {/* This calender renders in medium screen */}
            <div className="hidden lg:hidden sm:block place-self-center lg:place-self-end mt-10">
              <Calendar
                mode="single"
                className="rounded-md border"
                numberOfMonths={2}
                styles={{
                  caption: { color: "purple" },
                }}
              />
            </div>
          </>
        ) : null}

        {/* History */}
        <div className="lg:col-span-3">
          <h2 className="my-6 font-semibold text-gray-900 text-lg">History</h2>
          {interviews && interviews?.length !== 0 ? (
            <DisplayFiles />
          ) : (
            <DisplayEmpty />
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
