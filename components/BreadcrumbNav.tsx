// this is the server rendered method to get the current path in the server component.
// if needed compare with the 'use client' implemantation

import Link from "next/link";
import { headers } from "next/headers";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default async function BreadcrumbNav() {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  const isActivePath = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="mt-5 -mb-2 w-full flex justify-start rounded-2xl ring-[0.4px] ring-offset-4 shadow-xl ring-zinc-300">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} rounded-xl ${
                  isActivePath("/dashboard") ? "bg-gray-100" : ""
                }`}
              >
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/records" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} rounded-xl ${
                  isActivePath("/records") ? "bg-gray-100" : ""
                }`}
              >
                Records
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/setup" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} rounded-xl ${
                  isActivePath("/setup") ? "bg-gray-100" : ""
                }`}
              >
                Setup
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";

// export default function BreadcrumbNav() {
//   const pathname = usePathname();

//   const isActivePath = (path: string) => {
//     return pathname === path;
//   };

//   return (
//     <div className="mt-5 -mb-2 w-full flex justify-start rounded-2xl ring-[0.4px] ring-offset-4 shadow-xl ring-zinc-300">
//       <NavigationMenu>
//         <NavigationMenuList>
//           <NavigationMenuItem>
//             <Link href="/dashboard" legacyBehavior passHref>
//               <NavigationMenuLink
//                 className={`${navigationMenuTriggerStyle()} rounded-xl ${
//                   isActivePath("/dashboard") ? "bg-zinc-200" : ""
//                 }`}
//               >
//                 Dashboard
//               </NavigationMenuLink>
//             </Link>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <Link href="/records" legacyBehavior passHref>
//               <NavigationMenuLink
//                 className={`${navigationMenuTriggerStyle()} rounded-xl ${
//                   isActivePath("/records") ? "bg-zinc-200" : ""
//                 }`}
//               >
//                 Records
//               </NavigationMenuLink>
//             </Link>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <Link href="/setup" legacyBehavior passHref>
//               <NavigationMenuLink
//                 className={`${navigationMenuTriggerStyle()} rounded-xl ${
//                   isActivePath("/setup") ? "bg-zinc-200" : ""
//                 }`}
//               >
//                 Setup
//               </NavigationMenuLink>
//             </Link>
//           </NavigationMenuItem>
//         </NavigationMenuList>
//       </NavigationMenu>
//     </div>
//   );
// }
