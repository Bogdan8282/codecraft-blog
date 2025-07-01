import Header from "@/components/Header";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

type Props = {
  params: {
    category: string;
    slug: string;
  };
};

export default async function PostPage({ params }: Props) {
  const { slug, category } = await params;
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });
  const postCategory = await prisma.category.findUnique({
    where: {
      slug: category,
    },
  });
  if (!post || !postCategory) {
    notFound();
  }
  return (
    <>
      <Header />
      <main className="wrapper">
        <h2 className="mb-4">{post.title}</h2>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </main>
    </>
  );
}
