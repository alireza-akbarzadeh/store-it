"use client";
import React from "react";
import { Logo } from "@/components/logo";
import { navItems } from "@/constant";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type SidebarProps = {
  fullName: string;
  email: string;
  avatar: string;
};

export function Sidebar(props: SidebarProps) {
  const { fullName, email, avatar } = props;
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
      <Image
        src="/assets/images/files-2.png"
        alt="logo"
        width={506}
        height={418}
        className="w-full"
      />

      <div className="sidebar-user-info">
        <Image
          src={avatar}
          alt="avatar"
          width={44}
          className="sidebar-user-avatar"
          height={44}
        />
        <div className="hidden w-full max-w-[200px] lg:block">
          <p className="subtitle-2 truncate capitalize">{fullName}</p>
          <p className="subtitle-2  truncate capitalize">{email}</p>
        </div>
      </div>
    </aside>
  );
}
