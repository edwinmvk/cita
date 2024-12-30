"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export async function actionSigninSignup() {
  // get the session of logged in user
  const { getUser, isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  try {
    // check if the user is already logged in the browser session
    const user = await getUser();

    if (!user?.id || !user?.email) {
      throw new Error("Invalid user data from Kinde");
    }

    // check if user is in database
    const dbUser = await prismadb.user.findUnique({
      where: {
        kindeId: user.id,
      },
    });

    // if there is no user, then create a new user
    if (!dbUser) {
      await prismadb.user.create({
        data: {
          kindeId: user.id,
          name: user.given_name ?? "Anonymous",
          email: user.email,
        },
      });
    }

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Detailed error:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      throw new Error(error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Unknown error");
    }
  }
}
