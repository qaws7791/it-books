import { cn } from "@web/src/lib/utils";
import React, { useState } from "react";

interface TagInputProps extends React.HTMLAttributes<HTMLLabelElement> {
  placeholder?: string;
  maxTags?: number;
  maxChars?: number;
  onChangeTag?: (tags: string[]) => void;
}

const TagInput = ({
  placeholder = "태그 입력",
  className,
  maxTags = 20,
  maxChars,
  onChangeTag,
}: TagInputProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key, tagInput);
    if (e.key === "Enter" && tagInput) {
      const isTagExists = tags.includes(tagInput.trim());
      if (isTagExists || tags.length >= maxTags) {
        return;
      }
      const newTags = [...tags, tagInput.trim()];
      console.log(tags, newTags);
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
        "flex flex-wrap gap-2 border border-[#655F3A] p-4 rounded-md",
        className
      )}
    >
      {tags.map((tag, index) => (
        <button
          key={index}
          onClick={() => removeTag(index)}
          className="text-sm rounded-full px-3 py-1 bg-[#DED8C2]"
        >
          {tag}
        </button>
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
