import Header from "@/components/Header";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import RatingButtons from "@/components/RatingButtons";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      author: true,
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
      <main className="wrapper flex flex-col gap-6">
        <div className="flex gap-6 items-center justify-between w-full">
          <h2 className="whitespace-nowrap">{post.title}</h2>
          <hr className="flex-grow mt-0.5" />
          <div className="flex gap-6 items-center">
            <div className="flex gap-2 items-center">
              <Image
                src={`/icons/user.svg`}
                width={20}
                height={24}
                alt="user"
              />
              <span>{post.author?.name ?? "Анонім"}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src={`/icons/calendar.svg`}
                width={24}
                height={24}
                alt="calendar"
              />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <RatingButtons postId={post.id} initialRating={sumRating} />
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </main>
    </>
  );
}
