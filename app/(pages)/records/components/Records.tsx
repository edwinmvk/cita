"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import DisplayEmpty from "@/components/DisplayEmpty";
import { actionDeleteInterview } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Calendar as CalenderIcon, Loader2, Trash } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

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

  function DisplayFiles() {
    return (
      <ul className="mt-5 mb-5 p-3 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 shadow-inner rounded-lg">
        {interviews
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          // .slice(0, 3)
          .map((file) => (
            <li
              key={file.id}
              className="flex flex-col divide-y rounded-sm bg-gradient-to-r from-zinc-50 to-neutral-50 transition hover:shadow-lg"
            >
              <Link href="">
                <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                  {/* <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-violet-200 to-neutral-200" /> */}
                  <div className="flex-1 text-ellipsis overflow-hidden">
                    {/* "text-ellipsis overflow-hidden" is same as "truncate" */}
                    <h3 className="text-lg font-medium text-zinc-900 truncate">
                      {file.jobTitle}
                    </h3>
                  </div>
                </div>
              </Link>

              <div className="px-6 mt-4 grid grid-cols-2 place-items-center py-2 gap-6 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <CalenderIcon className="h-4 w-4" />
                  {format(new Date(file.createdAt), "MMM yyyy")}
                </div>

                <Button
                  onClick={() => handleDelete(file.id)}
                  size="sm"
                  className="w-full"
                  variant="destructive"
                  disabled={pendingButtons[file.id]} // Add this to disable the button during transition
                >
                  {pendingButtons[file.id] ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </li>
          ))}
      </ul>
    );
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
          <DisplayFiles />
        ) : (
          <DisplayEmpty />
        )}
      </div>
    </MaxWidthWrapper>
  );
}
