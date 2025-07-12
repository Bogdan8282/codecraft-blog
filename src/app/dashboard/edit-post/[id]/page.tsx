import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import TagSelector from "@/components/TagSelector";

interface EditPostPageProps {
  params: { id: string };
}

interface RedirectError extends Error {
  digest?: string;
}

async function updatePost(postId: string, formData: FormData) {
  "use server";

  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";
  const tagIds = formData.getAll("tags").map((id) => Number(id));

  try {
    await prisma.post.update({
      where: {
        id: postId,
        authorId: session.user.id,
      },
      data: {
        title,
        content,
        published,
        Tags: {
          set: tagIds.map((id) => ({ id })),
        },
      },
    });
    redirect("/dashboard");
  } catch (err) {
    const e = err as RedirectError;

    if (e.digest?.startsWith("NEXT_REDIRECT")) {
      throw e; // Дозволити Next.js обробити редірект
    }

    console.error("Failed to update post:", e);
    throw new Error("Could not update post");
  }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  const postId = params.id;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
      authorId: session.user.id,
    },
    include: {
      Tags: true,
    },
  });

  if (!post) {
    return <p>Пост не знайдено або доступ заборонено.</p>;
  }

  const allTags = await prisma.tag.findMany({
    select: { id: true, name: true },
  });

  const tagIds = post.Tags.map((tag: { id: number }) => tag.id);

  return (
    <>
      <Header />
      <main className="wrapper">
        <h1 className="text-2xl font-bold mb-4">Редагувати пост</h1>
        <form action={updatePost.bind(null, post.id)} className="space-y-4">
          <div>
            <label htmlFor="title">Заголовок</label>
            <input
              id="title"
              name="title"
              defaultValue={post.title}
              required
            />
          </div>

          <div>
            <label htmlFor="content">Контент</label>
            <textarea
              id="content"
              name="content"
              rows={10}
              defaultValue={post.content}
              required
            />
          </div>

          <div>
            <label htmlFor="published">Опублікувати</label>
            <input
              id="published"
              name="published"
              type="checkbox"
              defaultChecked={post.published}
            />
          </div>

          <TagSelector tags={allTags} defaultSelected={tagIds} />

          <button type="submit">Зберегти</button>
        </form>
      </main>
    </>
  );
}
