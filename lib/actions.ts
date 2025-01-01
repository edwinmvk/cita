"use server";

import { revalidatePath } from "next/cache";
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
  } catch (error: any) {
    console.error("Detailed error:", {
      error: true,
      message: error.message,
      name: error.name,
      stack: error.stack,
    });

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
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      error: false,
      message: "Interviews fetched successfully",
      interviews: interviews,
    };
  } catch (error: any) {
    console.error("Detailed error:", {
      error: true,
      message: error.message,
      name: error.name,
      stack: error.stack,
    });

    return {
      error: true,
      message: "Failed to fetch interviews",
    };
  }
}

export async function actionDeleteInterview(id: string) {
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

    // First, check if the service exists and belongs to the user
    const service = await prismadb.interview.findUnique({
      where: {
        id: id,
        userId: user.id, // Ensure the service belongs to the logged-in user
      },
    });

    // If no service found, return an error
    if (!service) {
      return {
        error: true,
        message: "Interview not found or you do not have permission to delete",
      };
    }

    // Delete the service
    const deletedService = await prismadb.interview.delete({
      where: {
        id: id,
      },
    });

    // Revalidate the path to refresh server-side rendered content, so that the latest service data is displayed
    // Issue: This is not working as expected for components inside Suspense, need to investigate further
    // revalidatePath("/dashboard");
    // revalidatePath("/records");
    // Temporary solution: Use router.refres() in client components

    return {
      error: false,
      message: "Service successfully deleted",
      service: deletedService,
    };
  } catch (error: any) {
    console.error("Detailed error:", {
      error: true,
      message: error.message,
      name: error.name,
      stack: error.stack,
    });

    return {
      error: true,
      message: "Failed to delete interview",
    };
  }
}
