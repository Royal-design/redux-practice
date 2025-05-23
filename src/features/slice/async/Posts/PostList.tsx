import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { fetchPosts } from "../postSlice";
import { TimeAgo } from "@/utilities/TimeAgo";
import { ReactionButtons } from "../../ReactionButtons";
import { PostAuthor } from "./PostAuthor";

export const PostList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, posts, status } = useAppSelector((state) => state.asyncposts);
  console.log("posts", posts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  if (status === "loading")
    return <p className="text-center">Loading posts...</p>;
  if (status === "failed")
    return <p className="text-center text-red-500">Error: {error}</p>;

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-4">
      {orderedPosts.map((post) => (
        <article key={post.id} className="border rounded-md p-4 shadow-sm">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-700 mt-1">{post.body}</p>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
          </div>
          <ReactionButtons post={post} />
        </article>
      ))}
    </div>
  );
};
