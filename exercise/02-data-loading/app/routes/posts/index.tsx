import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Link } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";

async function getPosts() {
  return [
    {
      slug: "my-first-post",
      title: "My First Post",
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
    },
  ];
}

export const loader = async ({ request }: LoaderArgs) => {
  const posts = await getPosts();
  /**
   * json helper is a method that returns a Response object
   * import { json } from "@remix-run/node";
   *  return new Response(JSON.stringify(posts), {
   *    headers: { "Content-Type": "application/json" },
   *  });
   */
  return json({ posts });
};

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
