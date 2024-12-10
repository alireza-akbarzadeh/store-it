import React from "react";
import { Models } from "node-appwrite";
import { Thumbnail } from "@/components/thumbnail";
import { FormattedDateTime } from "@/components/formatted-date-time";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const ImageThumbnail = ({ file }: { file: Models.Document }) => {
  return (
    <div className="file-details-thumbnail">
      <Thumbnail url={file.url} type={file.type} extension={file.extension} />
      <div className="flex flex-col">
        <p className="subtitle-2 mb-1">{file.name}</p>
        <FormattedDateTime date={file.$createdAt} className="caption" />
      </div>
    </div>
  );
};

export const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex">
    <p className="file-details-label text-left">{label}</p>
    <p className="file-details-value text-left">{value}</p>
  </div>
);

export function FileDetails({ file }: { file: Models.Document }) {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-2 pt-2 ">
        <DetailRow value={file.extension} label="Format :" />
        <DetailRow value={convertFileSize(file.size)} label="Size :" />
        <DetailRow value={file.owner.fullName} label="Owner :" />
        <DetailRow
          value={formatDateTime(file.owner.$updatedAt)}
          label="Last edit :"
        />
      </div>
    </>
  );
}

interface ShareInputProps {
  file: Models.Document;
  onInputChange: (value: string[]) => void;
  onRemove: (email: string) => void;
}

export function ShareInput(props: ShareInputProps) {
  const { file, onInputChange, onRemove } = props;

  return (
    <>
      <ImageThumbnail file={file} />
      <div className="share-wrapper">
        <p className="subtitle-2 pl-1 text-light-100">
          Share File With Other Users.
        </p>
        <Input
          type="email"
          placeholder="Enter"
          className="share-input-field"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="subtitle-2 text-light-100">Share with</p>
            <p className="subtitle-2 text-light-200">{file.users.length}</p>
          </div>
          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                className="flex items-center justify-between gap-2"
                key={email}
              >
                <p className="subtile-2">{email}</p>
                <Button
                  onClick={() => onRemove(email)}
                  className="share-remove-user"
                >
                  <Image
                    src="/assets/icons/remove.svg"
                    alt="remove"
                    width={24}
                    height={24}
                    className="remove-icon"
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
