"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TagSelectorProps = {
  existingTags: string[];
  selectedTags: string[];
  onTagAdd: (tag: string) => void;
  onTagRemove: (tag: string) => void;
};

const TagSelector: React.FC<TagSelectorProps> = ({
  existingTags,
  selectedTags,
  onTagAdd,
  onTagRemove,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleTagAddition = () => {
    const normalizedInput = inputValue.trim().toLowerCase();
    const normalizedSelectedTags = selectedTags?.map((tag) => tag.toLowerCase());

    if (normalizedInput && !normalizedSelectedTags.includes(normalizedInput)) {
      onTagAdd(inputValue.trim());
      setInputValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTagAddition();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Add a tag..."
          className="w-full"
        />
        <Button type="button" variant={"outline"} onClick={handleTagAddition}>
          Add Tag
        </Button>
      </div>

      {inputValue && (
        <div className="bg-white shadow-md rounded-lg p-2">
          {existingTags
            ?.filter((tag) =>
              tag.toLowerCase().includes(inputValue.toLowerCase())
            )
            ?.filter(
              (tag) =>
                !selectedTags
                  ?.map((t) => t.toLowerCase())
                  ?.includes(tag.toLowerCase())
            ) // Exclude already selected tags
            ?.map((tag) => (
              <div
                role="button"
                key={tag}
                onClick={() => {
                  onTagAdd(tag);
                  setInputValue("");
                }}
                className="cursor-pointer p-1 hover:bg-gray-200"
              >
                {tag}
              </div>
            ))}
        </div>
      )}

      <div className="flex flex-wrap mt-2">
        {selectedTags?.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-gray-200 rounded-full px-3 py-1 mr-2 mb-2"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => onTagRemove(tag)}
              className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
