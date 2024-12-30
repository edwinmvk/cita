import { Metadata } from "next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { inter } from "@/lib/fonts";
import RecordsPage from "./components/RecordsPage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BreadcrumbNav from "@/components/BreadcrumbNav";

export const metadata: Metadata = {
  title: "Records",
};

export default async function Page() {
  // get the session of logged in user
  const { getUser } = getKindeServerSession();

  // check if the user is already logged in the browser session
  const user = await getUser();
  if (!user || !user.id) {
    console.log("No user found in session, redirecting to auth-callback");
    redirect("/auth-callback?origin=records");
  }

  // if logged in browser, also check the database for the user
  const dbUser = await prismadb.user.findUnique({
    where: {
      kindeId: user.id,
    },
  });

  if (!dbUser) {
    console.log("No user found in database, redirecting to auth-callback");
    redirect("/auth-callback?origin=records");
  }

  return (
    <section className={`${inter.className}`}>
      <MaxWidthWrapper>
        <BreadcrumbNav />
      </MaxWidthWrapper>
      <RecordsPage />
    </section>
  );
}
