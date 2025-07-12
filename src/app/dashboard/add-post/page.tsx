import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import TagSelector from "@/components/TagSelector";
import Header from "@/components/Header";

interface RedirectError extends Error {
  digest?: string;
}

async function createPost(formData: FormData) {
  "use server";

  const session = await auth();
  if (!session?.user?.id) {
    redirect("/dashboard");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";
  const tagIds = formData.getAll("tags").map(Number);

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  try {
    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        published,
        authorId: session.user.id,
        Tags: {
          connect: tagIds.map((id) => ({ id })),
        },
      },
    });
    redirect("/");
  } catch (error) {
    const e = error as RedirectError;

    if (e.digest?.startsWith("NEXT_REDIRECT")) {
      throw e; // Дозволяємо Next.js обробити редірект
    }

    console.error("Failed to create post:", e);
    throw new Error("Failed to create post");
  }
}

export default async function AddPostPage() {
  const session = await auth();
  if (!session) redirect("/dashboard");

  const tags = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <>
      <Header />
      <main className="wrapper">
        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
        <form action={createPost} className="space-y-4">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              required
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              required
              placeholder="Write your post content..."
              rows={10}
            />
          </div>

          <div>
            <label htmlFor="published">Publish</label>
            <input id="published" name="published" type="checkbox" />
          </div>

          <TagSelector tags={tags} />

          <button type="submit">Create Post</button>
        </form>
      </main>
    </>
  );
}
