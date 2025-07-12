import { signIn } from "@/lib/auth";
import Image from "next/image";

const GoogleSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button className="w-full btn flex gap-2">
        <Image src="/icons/google-white.svg" alt="Google" width={18} height={18} />
        Продовжити з Google
      </button>
    </form>
  );
};

export { GoogleSignIn };
