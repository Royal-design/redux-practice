import { useAppSelector } from "@/app/store";
import React from "react";

type PostAuthorProps = {
  userId: number;
};

export const PostAuthor: React.FC<PostAuthorProps> = ({ userId }) => {
  const users = useAppSelector((state) => state.asyncUsers.users);
  const user = users.find((user) => String(user.id) === String(userId));
  return (
    <p className="text-xs">{user ? `By ${user.name}` : "By Unknown author"}</p>
  );
};
