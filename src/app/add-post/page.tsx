import { createPost } from "@/actions/actions";
import Link from "next/link";

export default async function AddPost() {
  return (
    <>
      <main>
        <form action={createPost}>
          <input type="text" name="title" placeholder="Title" />
          <textarea name="content" rows={5} placeholder="Content" />
          <button type="submit" className="btn">
            Create post
          </button>
          <br />
          <Link href="/posts">Go back</Link>
        </form>
      </main>
    </>
  );
}
