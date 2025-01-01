import { Ghost } from "lucide-react";

export default function DisplayEmpty() {
  return (
    <div className="mt-16 flex flex-col items-center gap-2 text-zinc-400 select-none">
      <Ghost className="h-8 w-8 text-zinc-400" />
      <h3 className="font-semibold text-xl">Pretty empty around here</h3>
      <p>Lets&apos;s try out a mock session.</p>
      <br />
      <p>
        Click on the{" "}
        <span className="font-bold text-gray-600">Start Practicing</span> button
        in the Dashboard.
      </p>
    </div>
  );
}
