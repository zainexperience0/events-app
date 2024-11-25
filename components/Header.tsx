import { currentUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { UserButton } from "./UserButton";

export const Header = async () => {
  const user = await currentUser();
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image src="/logo.svg" width={128} height={38} alt="Evently logo" />
        </Link>
        {user ? (
          <>
            <nav className="md:flex-between hidden w-full max-w-xs">
              <NavItems />
            </nav>
            <div className="flex w-32 justify-end gap-3">
              <UserButton />
              <MobileNav />
            </div>
          </>
        ) : (
          <Button asChild className="rounded-full" size="lg">
            <Link href="/auth">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
