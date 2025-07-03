import Link from "next/link";
import prisma from "@/lib/db";
import Header from "@/components/Header";

export default async function PostsPage() {
  const recentPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      Tags: true,
    },
    take: 8,
  });

  const popularPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: true,
      Tags: true,
      Ratings: true,
    },
    orderBy: {
      Ratings: {
        _count: "desc",
      },
    },
    take: 8,
  });

  return (
    <>
      <Header />
      <main className="w-full">
        <div className="wrapper">
          <section className="mb-8">
            <div className="flex gap-6 items-center mb-4">
              <h2 className="whitespace-nowrap">Останні пости</h2>
              <hr className="w-full mt-0.5" />
              <Link href={`/`} className="font-semibold tracking-wider">
                БІЛЬШЕ
              </Link>
            </div>
            <ul className="grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-6 gap-4">
              {recentPosts.map((post) => (
                <li key={post.id} className="bg-(--bg-main) mb-2 rounded-md">
                  <Link
                    href={`/${post.slug}`}
                    className="flex flex-col gap-1 justify-between h-full text-xl text-(--text-main) p-4"
                  >
                    <h4>{post.title}</h4>
                    <div className="blog-content">
                      <div className="text-base">
                        {`${post.content.slice(0, 100)}...`}
                      </div>
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
                </li>
              ))}
            </ul>
          </section>
          <section>
            <div className="flex gap-6 items-center mb-4">
              <h2 className="whitespace-nowrap">Популярне</h2>
              <hr className="w-full mt-0.5" />
              <Link href={`/`} className="font-semibold tracking-wider">
                БІЛЬШЕ
              </Link>
            </div>
            <ul className="grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-6 gap-4">
              {popularPosts.map((post) => (
                <li key={post.id} className="bg-(--bg-main) mb-2 rounded-md">
                  <Link
                    href={`/${post.slug}`}
                    className="flex flex-col gap-1 justify-between h-full text-xl text-(--text-main) p-4"
                  >
                    <h4>{post.title}</h4>
                    <div className="blog-content">
                      <div className="text-base">
                        {`${post.content.slice(0, 100)}...`}
                      </div>
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
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
