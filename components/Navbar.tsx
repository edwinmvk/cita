import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { opensans, pacifico } from "@/lib/fonts";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();

  let auth = true;
  if (!(await isAuthenticated())) {
    auth = false;
  }
  return (
    <header className="sticky top-0 w-full h-20 z-30 bg-white/80 backdrop-blur-sm">
      <MaxWidthWrapper>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center font-semibold text-2xl select-none xs:space-x-2 space-x-0.5"
          >
            <Image
              alt="logo"
              src="/images/logo.png"
              width={30}
              height={30}
              quality={100}
              priority
              className="w-auto h-auto"
            />
            <span className={`${pacifico.className} text-[#5a338a]`}>I</span>
            <span className={`${opensans.className} text-[#f658ee] text-2xl`}>
              T
            </span>
            <span className={`${pacifico.className} text-[#5a338a]`}>A.</span>
          </Link>

          {/* Avatar must only be shown when signed in and on smaller screens*/}
          {auth ? (
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    Edit profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Signout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : null}

          {/* Links must be shown only on larger screens */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href=""
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <h4 className="text-[16px]">Pricing</h4>
            </Link>

            {auth ? (
              <LogoutLink
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                <h4 className="text-[16px]">Sign out</h4>
              </LogoutLink>
            ) : (
              <>
                <LoginLink
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  <h4 className="text-[16px]">Sign in</h4>
                </LoginLink>

                <RegisterLink
                  className={buttonVariants({
                    variant: "default",
                    size: "sm",
                  })}
                >
                  <h4 className="text-[16px]"></h4>Get started{" "}
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </RegisterLink>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
