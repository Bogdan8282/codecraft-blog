import Link from "next/link";
import prisma from "@/lib/db";
import Header from "@/components/Header";
import ReactMarkdown from "react-markdown";

export default async function PostsPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      posts: {
        where: {
          published: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <main className="w-full">
        <div className="wrapper">
          {categories
            .filter((category) => category.posts.length > 0)
            .map((category) => (
              <section key={category.id} className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                <ul className="space-y-4 grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2">
                  {category.posts.map((post) => (
                    <li
                      key={post.id}
                      className="bg-(--bg-main) mb-2 rounded-md"
                    >
                      <Link
                        href={`/${category.slug}/${post.slug}`}
                        className="text-xl text-(--text-main) block p-4"
                      >
                        <h4>{post.title}</h4>
                        <div className="blog-content my-1">
                          <ReactMarkdown>
                            {`${post.content.slice(0, 100)}...`}
                          </ReactMarkdown>
                        </div>
                        <p className="text-sm text-(--text-secondary)">
                          Автор: {post.author?.name || "Невідомий"} | Дата:{" "}
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
        </div>
      </main>
    </>
  );
}
