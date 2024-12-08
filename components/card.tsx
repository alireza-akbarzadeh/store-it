import React from "react";
import { Models } from "node-appwrite";
import Link from "next/link";
import { Thumbnail } from "@/components/thumbnail";
import { convertFileSize } from "@/lib/utils";
import { FormattedDateTime } from "@/components/formatted-date-time";
import { ActionDropdown } from "@/components/action-dropdown";

export function Card({ file }: { file: Models.Document }) {
  return (
    <Link href={file.url} target="_blank" className="file-card">
      <div className="flex  justify-between">
        <Thumbnail
          type={file.type}
          extension={file.ex}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />
        <div className="flex flex-col items-end gap-3">
          <ActionDropdown file={file} />
          <p className="body-1 ">{convertFileSize(file.size)}</p>
        </div>
      </div>
      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{file.name}</p>
        <FormattedDateTime
          date={file.$createdAt}
          className="body-2 text-light-100"
        />
      </div>
    </Link>
  );
}
