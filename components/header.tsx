import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Search } from "@/components/search";
import { FileUploader } from "@/components/file-uploader";
import { signOutUser } from "@/lib/actions/user.action";
import { MenuCommand } from "@/components/menu-command";

type HeaderProps = {
  userId: string;
  accountId: string;
};

export function Header(props: HeaderProps) {
  const { accountId, userId } = props;

  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <MenuCommand />
        <FileUploader ownerId={userId} accountId={accountId} />
        <form
          action={async () => {
            "use server";

            await signOutUser();
          }}
        >
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
