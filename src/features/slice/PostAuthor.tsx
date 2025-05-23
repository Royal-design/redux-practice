import { useAppSelector } from "@/app/store";
import React from "react";

type PostAuthorProps = {
  userId: string;
};

export const PostAuthor: React.FC<PostAuthorProps> = ({ userId }) => {
  const users = useAppSelector((state) => state.users);
  const user = users.find((user) => user.id === userId);
  return (
    <p className="text-xs">{user ? `By ${user.name}` : "By Unknown author"}</p>
  );
};
