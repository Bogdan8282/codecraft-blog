"use client";

import Image from "next/image";
import { useState } from "react";

export default function RatingButtons({
  postId,
  initialRating,
}: {
  postId: string;
  initialRating: number;
}) {
  const [rating, setRating] = useState(initialRating);

  const handleRate = async (value: number) => {
    const res = await fetch("/api/rating", {
      method: "POST",
      body: JSON.stringify({ postId, value }),
    });

    if (res.ok) {
      setRating((prev) => prev + value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleRate(1)}
        className="small-btn success-btn text-white rounded"
      >
        <Image src={`/icons/like.svg`} width={18} height={20} alt="like" />
      </button>
      <span className="text-xl">{rating}</span>
      <button
        onClick={() => handleRate(-1)}
        className="small-btn fail-btn text-white rounded"
      >
        <Image src={`/icons/dislike.svg`} width={18} height={20} alt="dislike" />
      </button>
    </div>
  );
}
