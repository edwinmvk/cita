import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prismadb from "@/lib/prismadb";
import { inter } from "@/lib/fonts";
import Records from "./components/Records";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { actionFetchInterviews } from "@/lib/actions";
import Loading from "@/components/Loading";

export const metadata: Metadata = {
  title: "Records",
};

export default async function Page() {
  // get the session of logged in user
  const { getUser, isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/auth-callback?origin=records");
  }

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

  async function RecordsPage() {
    const { interviews } = await actionFetchInterviews();
    return <Records interviews={interviews || []} />;
  }

  // const dummyInterviews = [
  //   {
  //     id: "cld1234567890",
  //     resume:
  //       "Experienced software engineer with 5 years of experience in full-stack development...",
  //     jobTitle: "Senior Software Engineer",
  //     questions: [
  //       "Tell me about a challenging project you worked on",
  //       "How do you handle conflicts in a team?",
  //       "What's your experience with microservices?",
  //     ],
  //     userAnswers: [
  //       "In my previous role, I led a team that migrated our monolithic application to microservices...",
  //       "I believe in addressing conflicts early through open communication...",
  //       "I have extensive experience designing and implementing microservices...",
  //     ],
  //     angry: 0.02,
  //     sad: 0.03,
  //     neutral: 0.65,
  //     happy: 0.25,
  //     surprised: 0.05,
  //     extroversion: 0.75,
  //     neurotism: 0.3,
  //     agreeableness: 0.85,
  //     conscientiousness: 0.9,
  //     openness: 0.8,
  //     totalScore: 85,
  //     similarityScore: 0.78,
  //     similarityScoreList: [0.82, 0.75, 0.77],
  //     createdAt: new Date("2024-01-15T10:00:00Z"),
  //     userId: user.id,
  //   },
  //   {
  //     id: "clq9876503210",
  //     resume:
  //       "Product manager with expertise in agile methodologies and stakeholder management...",
  //     jobTitle: "Product Manager",
  //     questions: [
  //       "How do you prioritize features?",
  //       "Describe your experience with agile methodologies",
  //       "How do you handle stakeholder disagreements?",
  //     ],
  //     userAnswers: [
  //       "I use a combination of user impact, business value, and effort required...",
  //       "I've worked in Scrum teams for over 3 years...",
  //       "I focus on data-driven decisions and clear communication...",
  //     ],
  //     angry: 0.01,
  //     sad: 0.02,
  //     neutral: 0.7,
  //     happy: 0.22,
  //     surprised: 0.05,
  //     extroversion: 0.82,
  //     neurotism: 0.25,
  //     agreeableness: 0.88,
  //     conscientiousness: 0.85,
  //     openness: 0.78,
  //     totalScore: 88,
  //     similarityScore: 0.82,
  //     similarityScoreList: [0.85, 0.8, 0.81],
  //     createdAt: new Date("2024-01-16T14:30:00Z"),
  //     userId: user.id,
  //   },
  //   {
  //     id: "clq5678701234",
  //     resume:
  //       "Data scientist specializing in machine learning and predictive analytics...",
  //     jobTitle: "Senior Data Scientist",
  //     questions: [
  //       "Explain a machine learning project you've worked on",
  //       "How do you handle data quality issues?",
  //       "What's your experience with deep learning?",
  //     ],
  //     userAnswers: [
  //       "I developed a customer churn prediction model that achieved 85% accuracy...",
  //       "I implement robust data validation pipelines and cleaning procedures...",
  //       "I've worked extensively with neural networks for computer vision tasks...",
  //     ],
  //     angry: 0.01,
  //     sad: 0.02,
  //     neutral: 0.75,
  //     happy: 0.2,
  //     surprised: 0.02,
  //     extroversion: 0.65,
  //     neurotism: 0.28,
  //     agreeableness: 0.82,
  //     conscientiousness: 0.92,
  //     openness: 0.85,
  //     totalScore: 90,
  //     similarityScore: 0.85,
  //     similarityScoreList: [0.88, 0.84, 0.83],
  //     createdAt: new Date("2024-01-17T09:15:00Z"),
  //     userId: user.id,
  //   },
  // ];

  // // If you need to seed the database, you can use this:
  // async function seed() {
  //   for (const interview of dummyInterviews) {
  //     await prismadb.interview.create({
  //       data: interview,
  //     });
  //   }
  // }

  // seed();

  return (
    <section className={`${inter.className}`}>
      <MaxWidthWrapper>
        <BreadcrumbNav />
      </MaxWidthWrapper>
      <Suspense fallback={<Loading />}>
        <RecordsPage />
      </Suspense>
    </section>
  );
}
