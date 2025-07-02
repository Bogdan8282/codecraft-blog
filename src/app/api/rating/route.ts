import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postId, value } = await req.json();

  if (![1, -1].includes(value)) {
    return NextResponse.json(
      { error: "Invalid rating value" },
      { status: 400 }
    );
  }

  try {
    await prisma.postRating.upsert({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
      update: {
        value,
      },
      create: {
        userId: session.user.id,
        postId,
        value,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to rate post" }, { status: 500 });
  }
}
