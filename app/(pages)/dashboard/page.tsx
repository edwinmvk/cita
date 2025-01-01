import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prismadb from "@/lib/prismadb";
import { inter } from "@/lib/fonts";
import Dashboard from "./components/Dashboard";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { actionFetchInterviews } from "@/lib/actions";
import DisplayLoading from "@/components/DisplayLoading";

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

  async function DashboardPage() {
    const { interviews } = await actionFetchInterviews();
    return <Dashboard interviews={interviews || []} />;
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
