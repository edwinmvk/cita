"use client";

import { useState } from "react";
import Link from "next/link";
import { actionDeleteInterview } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar as CalenderIcon, Loader2, Trash } from "lucide-react";
import { format } from "date-fns";

type InterviewData = {
  id: string;
  jobTitle: string;
  createdAt: Date;
  totalScore: number;
};

type Props = {
  interviews: InterviewData[];
};

export default function DisplayFiles({ interviews }: Props) {
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
      //   title: "Info",
      //   description: result.message,
      // });
    } catch (error: any) {
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
