"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

// export async function actionSigninSignup() {
//   // get the auth status of logged in user
//   const { isAuthenticated } = getKindeServerSession();

//   // check whether user logged in the browser
//   if (!(await isAuthenticated())) {
//     redirect("/api/auth/login");
//   }

//   // check if user is in database
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();
//   const dbUser = await prismadb.user.findUnique({
//     where: {
//       kindeId: user?.id,
//     },
//   });

//   // if there is no user, then create a new user
//   if (!dbUser && user != null && user?.email != null) {
//     await prismadb.user.create({
//       data: {
//         kindeId: user?.id,
//         name: user?.given_name!,
//         email: user?.email,
//       },
//     });
//   }
//   return true;
// }

export async function actionSigninSignup() {
  const { getUser, isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  try {
    const user = await getUser();

    if (!user?.id || !user?.email) {
      throw new Error("Invalid user data from Kinde");
    }

    const dbUser = await prismadb.user.findUnique({
      where: {
        kindeId: user.id,
      },
    });

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
    console.log(error);
    throw new Error("Authentication failed");
  }
}
