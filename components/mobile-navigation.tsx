"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/constant";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/file-uploader";

type MobileNavigationProps = SidebarProps;

export function MobileNavigation(props: MobileNavigationProps) {
  const { avatar, fullName, email } = props;
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  return (
    <header className="mobile-header">
      <Image
        src="/assets/icons/logo-full-brand.svg"
        alt="logo"
        width={120}
        height={70}
        className="h-auto"
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            width={30}
            height={30}
            alt="menu"
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetHeader>
            <SheetTitle>
              <div className="header-user">
                <Image
                  src={avatar}
                  className="header-user-avatar"
                  alt="avatar"
                  width={44}
                  height={44}
                />
                <div className="sm:hidden lg:block">
                  <p className="subtitle-2 capitalize">{fullName}</p>
                  <p className="caption">{email}</p>
                </div>
                <Separator className="mb-4 bg-light-200/20" />
              </div>
            </SheetTitle>
            <nav className="mobile-nav">
              <ul className="mobile-nav-list">
                {navItems.map(({ url, name, icon }) => {
                  const active = pathName === url;
                  return (
                    <Link href={url} key={name}>
                      <li
                        className={cn("mobile-nav-item", {
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
                        <p>{name}</p>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </nav>
            <Separator className="my-5 bg-light-200/20" />
            <div className="flex flex-col justify-between gap-5 pb-5">
              <FileUploader />
              <Button
                type="submit"
                className="mobile-sign-out-button"
                onClick={() => {}}
              >
                <Image
                  src="/assets/icons/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
                <p>Logout</p>
              </Button>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
