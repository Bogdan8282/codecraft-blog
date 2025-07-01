import prisma from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    category: string;
  };
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const categoryItem = await prisma.category.findUnique({
    where: {
      slug: category,
    },
  });

  const categoryPosts = await prisma.post.findMany({
    where: {
      Category: {
        slug: category,
      }
    }
  })

  if (!categoryItem) {
    notFound();
  }

  return (
    <main>
      <h2>{categoryItem.name}</h2>
      <ul>
      {categoryPosts.map((post)=>(
        <li key={post.slug}>
          <Link href={`/${categoryItem.slug}/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
      </ul>
    </main>
  );
}
