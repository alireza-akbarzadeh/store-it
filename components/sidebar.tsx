"use client";
import React from "react";
import { Logo } from "@/components/logo";
import { navItems } from "@/constant";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathName = usePathname();

  return (
    <aside className="sidebar">
      <Logo className="hidden h-auto lg:block" />
      <Logo
        src="/assets/icons/logo-brand.svg"
        width={52}
        height={52}
        className="lg:hidden"
      />
      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => {
            const active = pathName === url;
            return (
              <Link href={url} key={name}>
                <li
                  className={cn("sidebar-nav-item", {
                    "shad-active": active,
                  })}
                >
                  <Image
                    className={cn("nav-icon", {
                      "nav-icon-active": active,
                    })}
                    src={icon}
                    alt={name}
                    width={24}
                    height={24}
                  />
                  <p className="hidden lg:block">{name}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
