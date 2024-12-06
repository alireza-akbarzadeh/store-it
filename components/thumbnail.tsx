import React from "react";
import Image from "next/image";
import { cn, getFileIcon } from "@/lib/utils";

export function Thumbnail(props: ThumbnailProps) {
  const { type, extension, url, imageClassName, className } = props;

  const isImage = type === "image" && extension !== "svg";

  return (
    <figure className={cn("thumbnail", className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        width={100}
        height={100}
        className={cn(
          "size-8 object-contain",
          imageClassName,
          isImage && "thumbnail-image",
        )}
        alt="thumbnail"
      />
    </figure>
  );
}
