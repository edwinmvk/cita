"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import DisplayEmpty from "@/components/DisplayEmpty";
import { actionDeleteInterview } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
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

export default function Records({ interviews }: Props) {
  const [pendingButtons, setPendingButtons] = useState<Record<string, boolean>>(
    {}
  );
  const router = useRouter();
  const { toast } = useToast();

  async function handleDelete(id: string) {
    setPendingButtons((prev) => ({ ...prev, [id]: true }));
    try {
      await actionDeleteInterview(id);
      // const result = await actionDeleteInterview(id);
      // toast({
      //   title: result.error ? "Failed" : "Success",
      //   description: result.message,
      // });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Info",
        description: error.message,
      });
    } finally {
      setPendingButtons((prev) => ({ ...prev, [id]: false }));
      router.refresh();
    }
  }

  return (
    <MaxWidthWrapper>
      <div className="my-10 grid grid-cols-1 gap-8">
        <div className="flex flex-col items-start justify-between gap-4 xs:flex-row xs:items-center sm:gap-0">
          <h2 className="font-semibold text-gray-900 leading-loose">
            All my previous <br />
            <span className="text-3xl font-bold">Records</span>
          </h2>
        </div>

        {/* History */}
        {interviews && interviews.length !== 0 ? (
          <DisplayFiles interviews={interviews} />
        ) : (
          <DisplayEmpty />
        )}
      </div>
    </MaxWidthWrapper>
  );
}
