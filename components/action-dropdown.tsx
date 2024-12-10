"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Models } from "node-appwrite";
import { actionsDropdownItems } from "@/constant";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileDetails } from "@/components/action-dialog-content";

type ActionDropdownProps = {
  file: Models.Document;
};

export function ActionDropdown(props: ActionDropdownProps) {
  const { file } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);

  const closeAllModal = () => {
    setIsModalOpen(false);
    setIsDropDownOpen(false);
    setAction(null);
    setName(file.name);
  };

  const handleActionClick = async () => {};

  const renderDialogContent = () => {
    if (!action) return null;
    const { value, label } = action;

    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          )}
          {value === "details" && <FileDetails file={file} />}
        </DialogHeader>
        {["rename", "share", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button className="modal-cancel-button" onClick={closeAllModal}>
              Cancel
            </Button>
            <Button className="modal-submit-button" onClick={handleActionClick}>
              <p className="capitalize">{value}</p>
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="alt"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
          <DropdownMenuTrigger className="shad-no-focus">
            <Image
              src="/assets/icons/dots.svg"
              alt="docs"
              height={34}
              width={34}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="max-w-[200px] truncate">
              {file.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {actionsDropdownItems.map((item) => (
              <DropdownMenuItem
                onClick={() => {
                  setAction(item);
                  const actionItems = ["rename", "share", "delete", "details"];
                  if (actionItems.includes(item.value)) {
                    setIsModalOpen(true);
                  }
                }}
                className="shad-dropdown-item"
                key={item.value}
              >
                {item.value === "download" ? (
                  <Link
                    download={file.name}
                    className="flex items-center gap-2"
                    href={constructDownloadUrl(file.bucketFileId)}
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={30}
                      height={30}
                    />
                    {item.label}
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={30}
                      height={30}
                    />
                    {item.label}
                  </div>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {renderDialogContent()}
      </Dialog>
    </div>
  );
}
