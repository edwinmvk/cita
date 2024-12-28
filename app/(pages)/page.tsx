import Link from "next/link";
import { Metadata } from "next";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Video, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <section>
      {/* Hero Section */}
      <div className="pt-36 pb-24 px-4 bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <MaxWidthWrapper>
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Meet your new{" "}
              <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                interview assistant
              </span>{" "}
              and do mock preps right away!!
            </h1>
            <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
              Conversational Interview and Training Assistant allows you to
              practice mock interview sessions with AI. Simply upload your
              resume and job description. Let the AI do the rest.
            </p>
            <Link
              href="/dashboard"
              className={buttonVariants({
                size: "lg",
                variant: "default",
                className: "mt-12 rounded-xl animate-bounce",
              })}
            >
              Take me to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4">
        <div className="container mx-auto grid md:grid-cols-3 gap-12">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <FileText className="w-12 h-12 text-emerald-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
              Prepare your tailored resume
            </h3>
            <p className="text-gray-600">
              Create a professional resume tailored to your target role
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Upload className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Upload to CITA powered by Gemini
            </h3>
            <p className="text-gray-600">
              Let our AI analyze your resume and prepare personalized interview
              questions
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Video className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Try mock interviews
            </h3>
            <p className="text-gray-600">
              Practice with our AI interviewer and get instant feedback
            </p>
          </Card>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 px-4 bg-gray-100">
        <MaxWidthWrapper>
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Simple, transparent pricing
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <Card className="p-8 shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">Free Plan</h3>
                <div className="text-4xl font-bold mb-6">
                  $0<span className="text-xl text-gray-500">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>3 mock interviews per month
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Basic resume analysis
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Standard question bank
                  </li>
                </ul>
                <Button variant="secondary" className="w-full">
                  Get started
                </Button>
              </Card>

              {/* Premium Plan */}
              <Card className="p-8 shadow-sm border-purple-200 bg-purple-50">
                <h3 className="text-2xl font-semibold mb-4">Premium Plan</h3>
                <div className="text-4xl font-bold mb-6">
                  $29<span className="text-xl text-gray-500">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Unlimited mock interviews
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Advanced AI resume optimization
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Industry-specific questions
                  </li>
                </ul>
                <Button className="w-full">Start free trial</Button>
              </Card>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}
