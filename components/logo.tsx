import React from "react";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  href: string;
};

export function Logo(props: Partial<LogoProps>) {
  const {
    src = "/assets/icons/logo-full-brand.svg",
    alt = "logo",
    width = 160,
    height = 50,
    className,
    href = "/",
  } = props;
  return (
    <Link href={href}>
      <Image
        className={className}
        src={src}
        alt={alt}
        height={height}
        width={width}
      />
    </Link>
  );
}
