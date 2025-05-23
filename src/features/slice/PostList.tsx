import React from "react";
import { useAppSelector } from "../../app/store";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "@/utilities/TimeAgo";
import { ReactionButtons } from "./ReactionButtons";

export const PostList: React.FC = () => {
  const posts = useAppSelector((state) => state.posts);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedposts = orderedPosts.map((post) => (
    <article key={post.id} className="border rounded-md p-2">
      <h1 className="text-xl">{post.title}</h1>
      <p>{post.content}</p>
      <div className="mt-2 flex items-center gap-4">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>
      <ReactionButtons post={post} />
    </article>
  ));
  return (
    <section>
      <h2 className="text-lg">Posts</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {renderedposts}
      </div>
    </section>
  );
};
