"use client";

import { useState } from "react";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import DisplayEmpty from "@/components/DisplayEmpty";
import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import LineChart from "./LineChart";
import DisplayFiles from "./DisplayFiles";

type InterviewData = {
  id: string;
  jobTitle: string;
  createdAt: Date;
  totalScore: number;
};

type Props = {
  interviews: InterviewData[];
};

export default function Dashboard({ interviews }: Props) {
  // This is just the example to use useActionState with extra parameters
  // const [state, action, isPending] = useActionState(actionServiceEdit, null);
  // action={(formData) => action({ formData, data })}
  // export async function actionServiceEdit(previousState = {},{ formData, data }){}

  const [pendingButtons, setPendingButtons] = useState<Record<string, boolean>>(
    {}
  );

  const scoreList = interviews.map((interview) => interview.totalScore);

  return (
    <MaxWidthWrapper>
      <div className="my-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          className={
            interviews && interviews.length !== 0
              ? "lg:col-span-2"
              : "lg:col-span-3"
          }
        >
          <div className="flex flex-col items-start justify-between gap-4 xs:flex-row xs:items-center sm:gap-0">
            <h2 className="font-semibold text-gray-900 leading-loose">
              Good morning, welcome to <br />
              <span className="text-3xl font-bold">My Dashboard</span>
            </h2>
            <Link
              href="/setup"
              className={buttonVariants({
                size: "sm",
                variant: "default",
                className: "my-5 ",
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
          <h2 className="mt-4 mb-6 font-semibold text-gray-900 text-lg">
            Recents
          </h2>
          {interviews && interviews.length !== 0 ? (
            <DisplayFiles interviews={interviews} />
          ) : (
            <DisplayEmpty />
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
