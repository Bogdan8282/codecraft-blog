"use client";

import { useState } from "react";

export default function TagSelector({ tags }: { tags: { id: number; name: string }[] }) {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const handleTagToggle = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <div className="space-y-2">
      <label>Tags</label>
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
