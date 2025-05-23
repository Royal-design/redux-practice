import React from "react";
import { Button } from "@/Components/ui/button";
import { useAppDispatch } from "@/app/store";
import { PostType, reactionAdded } from "./async/postSlice";

const reactionEmoji: Record<keyof PostType["reactions"], string> = {
  thumbsUp: "👍",
  wow: "😲",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕"
};

type ReactionButtonsProps = {
  post: PostType;
};

export const ReactionButtons: React.FC<ReactionButtonsProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const reactionName = name as keyof PostType["reactions"];
    return (
      <Button
        className="bg-transparent hover:bg-transparent text-xs h-1 w-[2.5rem] text-black "
        key={name}
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: reactionName }))
        }
      >
        {emoji} {post.reactions[reactionName]}
      </Button>
    );
  });

  return <div>{reactionButtons}</div>;
};
