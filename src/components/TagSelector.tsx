"use client";

import { useState } from "react";

export default function TagSelector({
  tags,
  defaultSelected = [],
}: {
  tags: { id: number; name: string }[];
  defaultSelected?: number[];
}) {
  const [selectedTags, setSelectedTags] = useState<number[]>(defaultSelected);

  const handleTagToggle = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <div className="space-y-2">
      <label>Теги</label>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div key={tag.id} className="flex items-center space-x-2">
            <input
              id={`tag-${tag.id}`}
              name="tags"
              value={tag.id}
              type="checkbox"
              checked={selectedTags.includes(tag.id)}
              onChange={() => handleTagToggle(tag.id)}
            />
            <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
