"use client";
import { imageLoader } from "@/src/shared/utils";
import Image from "next/image";
import React from "react";

interface NextImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function NextImage({
  src,
  alt,
  width,
  height,
  ...props
}: NextImageProps) {
  return (
    <Image
      loader={imageLoader}
      src={src}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}
