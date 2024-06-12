"use client";
import { cn } from "@/src/feature/shared/lib/utils";
import Chip, { ChipRemoveIcon } from "@/src/ui/components/chip";
import React, { useState } from "react";

interface TagInputProps extends React.ComponentPropsWithoutRef<"label"> {
  placeholder?: string;
  maxTags?: number;
  maxChars?: number;
  onChangeTag?: (tags: string[]) => void;
  value: string[];
}

const TagInput = ({
  placeholder = "태그 입력",
  className,
  maxTags = 20,
  maxChars,
  onChangeTag,
  value,
}: TagInputProps) => {
  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && tagInput) {
      const isTagExists = value.includes(tagInput.trim());
      const isOverMaxTags = value.length > maxTags;
      if (!isTagExists && !isOverMaxTags) {
        const newTags = [...value, tagInput.trim()];
        setTagInput("");
        onChangeTag && onChangeTag(newTags);
      }
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...value];
    newTags.splice(index, 1);
    onChangeTag && onChangeTag(newTags);
  };

  return (
    <label
      htmlFor="tags"
      className={cn(
        "flex flex-wrap gap-2 border border-outline p-4 rounded-md",
        className,
      )}
    >
      {value.map((tag, index) => (
        <Chip key={tag}>
          {tag}
          <ChipRemoveIcon onClick={() => removeTag(index)} />
        </Chip>
      ))}
      <input
        id="tags"
        className="text-sm bg-transparent"
        placeholder={placeholder}
        type="text"
        value={tagInput}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        maxLength={maxChars}
      />
    </label>
  );
};

export default TagInput;
