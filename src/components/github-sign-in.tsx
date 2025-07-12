import { signIn } from "@/lib/auth";
import Image from "next/image";

const GitHubSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button className="w-full btn flex gap-2">
        <Image src="/icons/github-white.svg" alt="GitHub" width={18} height={18} />
        Продовжити з GitHub
      </button>
    </form>
  );
};

export { GitHubSignIn };
