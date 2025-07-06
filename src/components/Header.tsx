import Link from "next/link";
import Image from "next/image";
import React from "react";
import { auth } from "@/lib/auth";

export default async function Header() {
  const session = await auth();
  return (
    <header className="w-full mb-8 bg-(--bg-main)">
      <div className="wrapper px-6 py-6 flex justify-between">
        <div>
          <Link
            href="/"
            className="relative flex justify-between items-center w-[240px] h-[38px]"
          >
            <Image
              src="/icons/logo.svg"
              alt="logo"
              fill
              className="object-cover"
            />
          </Link>
        </div>
        {session ? (
          <Link href={`/dashboard`} className="link-btn">
            Управління
          </Link>
        ) : (
          <Link href={`/auth`} className="link-btn">
            Увійти
          </Link>
        )}
      </div>
    </header>
  );
}
