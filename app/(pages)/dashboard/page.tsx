import { Suspense } from "react";
import { Metadata } from "next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { inter } from "@/lib/fonts";
import DashboardComponent from "./components/DashboardComponent";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { actionFetchInterviews } from "@/lib/actions";
import Skeleton from "react-loading-skeleton";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  // get the session of logged in user
  const { getUser } = getKindeServerSession();

  // check if the user is already logged in the browser session
  const user = await getUser();
  if (!user || !user.id) {
    console.log("No user found in session, redirecting to auth-callback");
    redirect("/auth-callback?origin=dashboard");
  }

  // if logged in browser, also check the database for the user
  const dbUser = await prismadb.user.findUnique({
    where: {
      kindeId: user.id,
    },
  });

  if (!dbUser) {
    console.log("No user found in database, redirecting to auth-callback");
    redirect("/auth-callback?origin=dashboard");
  }

  function DisplayLoading() {
    return (
      <MaxWidthWrapper className="py-6">
        <Skeleton height={60} className="my-2" count={6} enableAnimation />
      </MaxWidthWrapper>
    );
  }

  async function DashboardPage() {
    const { interviews } = await actionFetchInterviews();
    return <DashboardComponent interviews={interviews || []} />;
  }

  return (
    <section className={`${inter.className}`}>
      <MaxWidthWrapper>
        <BreadcrumbNav />
      </MaxWidthWrapper>
      <Suspense fallback={<DisplayLoading />}>
        <DashboardPage />
      </Suspense>
    </section>
  );
}
