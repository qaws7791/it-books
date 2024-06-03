import { cn } from "@/src/feature/shared/lib/utils";
import Chip from "@/src/ui/components/chip";
import React, { useState } from "react";

interface TagInputProps extends React.HTMLAttributes<HTMLLabelElement> {
  placeholder?: string;
  maxTags?: number;
  maxChars?: number;
  onChangeTag?: (tags: string[]) => void;
  defaultValue?: string[];
}

const TagInput = ({
  placeholder = "태그 입력",
  className,
  maxTags = 20,
  maxChars,
  onChangeTag,
  defaultValue,
}: TagInputProps) => {
  const [tags, setTags] = useState<string[]>(defaultValue || []);
  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && tagInput) {
      const isTagExists = tags.includes(tagInput.trim());
      if (isTagExists || tags.length >= maxTags) {
        return;
      }
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setTagInput("");
      onChangeTag && onChangeTag(newTags);
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
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
      {tags.map((tag, index) => (
        <Chip key={index} onClick={() => removeTag(index)}>
          {tag}
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
