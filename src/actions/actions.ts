"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from '@/lib/auth';

export async function createPost(formData: FormData) {
  await prisma.post.create({
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, ""),
      content: formData.get("content") as string,
      author: {
        connect: {
          email: "john@gmail.com",
        },
      }
    },
  });
  revalidatePath("/posts");
}

export async function updatePost(formData: FormData, id: string) {
  await prisma.post.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, ""),
      content: formData.get("content") as string,
    },
  });
  revalidatePath("/posts");
}

export async function deletePost(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Не авторизовано");
  }

  const postId = formData.get("postId") as string;

  if (!postId) {
    throw new Error("postId не передано");
  }

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        authorId: session.user.id,
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Помилка при видаленні поста:", error);
    throw new Error("Не вдалося видалити пост");
  }
}