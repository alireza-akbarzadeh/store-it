import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Search } from "@/components/search";
import { FileUploader } from "@/components/file-uploader";

export function Header() {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader />
        <form action="">
          <Button type="submit" className="sign-out-button">
            <Image
              width={24}
              height={24}
              className="w-6"
              src="/assets/icons/logout.svg"
              alt="logout"
            />
          </Button>
        </form>
      </div>
    </header>
  );
}
