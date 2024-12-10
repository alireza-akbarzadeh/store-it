"use client";

import * as React from "react";
import { CreditCard, Settings, User } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { navItems } from "@/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function MenuCommand() {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevState) => !prevState);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, url: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigateAndClose(url);
    }
  };

  const navigateAndClose = (url: string) => {
    router.push(url);
    setOpen(false);
  };

  const handleClick = (url: string) => {
    navigateAndClose(url);
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setOpen(!open)}
        className="hidden h-[49px] w-[150px] justify-between rounded-lg border bg-muted lg:flex"
      >
        <p>Find Menu...</p>
        <p className="text-sm text-muted-foreground">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1  px-1.5 text-[10px] font-medium text-muted-foreground ">
            <span className="text-xs">⌘</span>K
          </kbd>
        </p>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {navItems.map(({ url, name, icon }) => {
              return (
                <CommandItem
                  key={name}
                  onKeyDown={(e) => handleKeyDown(e, url)} // Handle Enter key press
                  onClick={() => handleClick(url)} // Handle click event
                  tabIndex={0} // Make sure it's focusable
                >
                  <li className="flex list-none items-center gap-2">
                    <Image
                      className="w-5 opacity-65 invert"
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                    />
                    <p className="hidden lg:block">{name}</p>
                  </li>
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
