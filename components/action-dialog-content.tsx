import React from "react";
import { Models } from "node-appwrite";
import { Thumbnail } from "@/components/thumbnail";
import { FormattedDateTime } from "@/components/formatted-date-time";
import { convertFileSize, formatDateTime } from "@/lib/utils";

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
      {(console.log(file), "file")}
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
