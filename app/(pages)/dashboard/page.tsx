import { Metadata } from "next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { inter } from "@/lib/fonts";
// import DashboardPage from "./components/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  // get the session of logged in user
  const { getUser } = getKindeServerSession();

  // Check if the user is already logged in the browser session
  const user = await getUser();
  if (!user || !user.id) {
    console.log("No user found in session, redirecting to auth-callback");
    redirect("/auth-callback?origin=dashboard");
  }

  try {
    console.log("\n\nError happens here\n\n");
    // If logged in browser, also check the database for the user
    const dbUser = await prismadb.user.findUnique({
      where: {
        kindeId: user?.id,
      },
    });

    if (!dbUser) {
      console.log("No user found in database, redirecting to auth-callback");
      redirect("/auth-callback?origin=dashboard");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error in fetching user from database");
  }

  return <section className={`${inter.className}`}>hi</section>;
}
