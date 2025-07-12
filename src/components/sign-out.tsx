"use client";
import { signOut } from "next-auth/react";

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div>
      <button className="btn fail-btn" onClick={handleSignOut}>
        Вийти
      </button>
    </div>
  );
};

export { SignOut };
