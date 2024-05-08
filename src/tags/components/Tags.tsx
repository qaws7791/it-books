import { Tag } from "@/src/tags/types";
import Link from "next/link";
import React from "react";

interface TagsProps {
  tags: Tag[];
}

export default function Tags({ tags }: TagsProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="flex border border-primary rounded-lg text-sm line-clamp-1 whitespace-nowrap"
        >
          <Link href={`/tags/${tag.name}`} className="px-4 py-1">
            {tag.name}
          </Link>
        </span>
      ))}
    </div>
  );
}
