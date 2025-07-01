import { auth } from "@/lib/auth";

import { GoogleSignIn } from "@/components/google-sign-in";
import { GitHubSignIn } from "@/components/github-sign-in";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <main className="w-full h-dvh flex justify-center items-center bg-(--bg-secondary)">
      <div className="w-full max-w-md flex flex-col p-8 gap-4 bg-(--bg-main) rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-2">Вхід</h1>
        <h4 className="text-lg font-medium text-center">
          Оберіть метод авторизації:
        </h4>
        <GoogleSignIn />
        <GitHubSignIn />
      </div>
    </main>
  );
};

export default Page;
