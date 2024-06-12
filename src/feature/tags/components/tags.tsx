import { Tag } from "@/src/feature/tags/types";
import Chip from "@/src/ui/components/chip";
import Link from "next/link";

interface TagsProps {
  tags: Tag[];
}

export default function Tags({ tags }: TagsProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      {tags.map((tag) => (
        <Chip key={tag.id} asChild>
          <Link href={`/tags/${tag.name}`}>{tag.name}</Link>
        </Chip>
      ))}
    </div>
  );
}
