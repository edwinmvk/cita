import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prismadb from "@/lib/prismadb";
import { inter } from "@/lib/fonts";
import Setup from "./components/Setup";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export const metadata: Metadata = {
  title: "Setup",
};

export default async function Page() {
  // get the session of logged in user
  const { getUser, isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/auth-callback?origin=setup");
  }

  // check if the user is already logged in the browser session
  const user = await getUser();
  if (!user || !user.id) {
    console.log("No user found in session, redirecting to auth-callback");
    redirect("/auth-callback?origin=setup");
  }

  // if logged in browser, also check the database for the user
  const dbUser = await prismadb.user.findUnique({
    where: {
      kindeId: user.id,
    },
  });

  if (!dbUser) {
    console.log("No user found in database, redirecting to auth-callback");
    redirect("/auth-callback?origin=setup");
  }

  return (
    <section className={`${inter.className}`}>
      <MaxWidthWrapper>
        <BreadcrumbNav />
      </MaxWidthWrapper>
      <Setup />
    </section>
  );
}
