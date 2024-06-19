"use client";
import { imageLoader } from "@/src/feature/shared/utils";
import Image, { ImageProps } from "next/image";

type NextImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
} & ImageProps;

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
