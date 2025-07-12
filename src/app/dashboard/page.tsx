import Header from "@/components/Header";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import ReactMarkdown from "react-markdown";

const DashboardPage = async () => {
  const session = await auth();
  if (!session) redirect("/");

  const posts = await prisma.post.findMany({
    where: {
      authorId: session.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      Tags: true,
    },
  });

  return (
    <>
      <Header />
      <main className="wrapper flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex">
            <h3>Вітаємо, {session.user?.name}!</h3>
          </div>
          <div className="flex gap-6 items-center">
            <Link href={`/dashboard/add-post`} className="link-btn success-btn">
              Новий пост
            </Link>
            <SignOut />
          </div>
        </div>
        <div>
          <h2 className="mb-4">Ваші пости:</h2>
          <ul className="grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-6 gap-4">
            {posts.map((post) => (
              <li key={post.id} className="flex flex-col gap-2">
                <div key={post.id} className="bg-(--bg-main) rounded-md">
                  <Link
                    href={`/${post.slug}`}
                    className="flex flex-col gap-1 justify-between h-full text-xl text-(--text-main) p-4"
                  >
                    <h4>{post.title}</h4>
                    <div className="blog-content">
                      <ReactMarkdown>
                        {`${post.content.slice(0, 100)}...`}
                      </ReactMarkdown>
                    </div>
                    <p className="text-sm text-(--text-secondary)">
                      Автор: {post.author?.name || "Невідомий"} | Дата:{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    {post.Tags.length > 0 && (
                      <div className="mt-1 text-sm text-(--text-secondary) flex flex-wrap gap-2">
                        {post.Tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="bg-(--bg-secondary) px-2 py-1 rounded"
                          >
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </div>
                <div className="w-full max-w-md mx-auto flex gap-2">
                  <Link
                    href={`/dashboard/edit-post/${post.id}`}
                    className="link-btn flex-1"
                  >
                    Редагувати
                  </Link>
                  <button className="btn flex-1">
                    Видалити
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
