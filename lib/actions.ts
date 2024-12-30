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

    // if there is no user, then SignUp take place, else SignIn take place
    if (!dbUser) {
      await prismadb.user.create({
        data: {
          kindeId: user.id,
          name: user.given_name ?? "Anonymous",
          email: user.email,
        },
      });
    }

    return {
      error: false,
      message: "Logged in successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Detailed error:", {
        error: true,
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    } else {
      console.error("Unknown error:", error);
    }
    return {
      error: true,
      message: error,
    };
  }
}

export async function actionFetchInterviews() {
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

    // fetch interviews from database
    const interviews = await prismadb.interview.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        jobTitle: true,
        createdAt: true,
        totalScore: true,
      },
    });

    return {
      error: false,
      message: "Interviews fetched successfully",
      interviews: interviews,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Detailed error:", {
        error: true,
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    } else {
      console.error("Unknown error:", error);
    }
    return {
      error: true,
      message: error,
    };
  }
}
