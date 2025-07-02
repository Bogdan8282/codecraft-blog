import Header from "@/components/Header";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import RatingButtons from "@/components/RatingButtons";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  const totalRating = await prisma.postRating.aggregate({
    where: { postId: post?.id },
    _sum: { value: true },
  });

  const sumRating = totalRating._sum.value ?? 0;

  if (!post) {
    notFound();
  }
  return (
    <>
      <Header />
      <main className="wrapper flex flex-col gap-4">
        <div className="flex justify-between">
          <h2>{post.title}</h2>
          <div className="flex gap-4">
            <span></span>
          </div>
        </div>
        <RatingButtons postId={post.id} initialRating={sumRating} />
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </main>
    </>
  );
}
