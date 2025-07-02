"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div>
      <Button className="btn fail-btn" variant="destructive" onClick={handleSignOut}>
        Вийти
      </Button>
    </div>
  );
};

export { SignOut };
