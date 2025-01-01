import Skeleton from "react-loading-skeleton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function DisplayLoading() {
  return (
    <MaxWidthWrapper className="py-8">
      <Skeleton height={60} className="my-2" count={6} enableAnimation />
    </MaxWidthWrapper>
  );
}
