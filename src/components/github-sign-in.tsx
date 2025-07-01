import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const GitHubSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button className="w-full" variant="outline">
        <Image src="/icons/github-white.svg" alt="GitHub" width={18} height={18} />
        Продовжити з GitHub
      </Button>
    </form>
  );
};

export { GitHubSignIn };
