import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <>
      <div className="p-8 text-center mb-6">
        <p className="">Signed in as:</p>
        <p className="font-medium">{session.user?.email}</p>
      </div>

      <SignOut />
    </>
  );
};

export default Page;
