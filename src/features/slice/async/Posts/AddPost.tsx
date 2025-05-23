import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/Components/ui/select";
import { addNewPost } from "../postSlice";

export const AddPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.asyncUsers.users);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [addRequestStatus, setAddRequestStatus] = useState<"idle" | "pending">(
    "idle"
  );

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setBody(e.target.value);

  const onAuthorChange = (value: string) => {
    const numericId = Number(value);
    setUserId(numericId);
  };

  const canSave =
    [title, body].every(Boolean) &&
    userId !== null &&
    addRequestStatus === "idle";

  const resetForm = () => {
    setTitle("");
    setBody("");
    setUserId(null);
  };

  const addPost = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(
          addNewPost({
            title,
            body,
            userId
          })
        ).unwrap();
        resetForm();
      } catch (error) {
        console.error("Failed to save the post:", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <Card className="w-sm">
          <CardHeader>
            <CardTitle>Add Post</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                name="postTitle"
                value={title}
                onChange={onChangeTitle}
                placeholder="Title"
              />
            </div>

            <div>
              <Label htmlFor="user">Author</Label>
              <Select
                value={userId !== null ? String(userId) : ""}
                onValueChange={onAuthorChange}
                disabled={users.length === 0}
              >
                <SelectTrigger id="user" className="w-full">
                  <SelectValue
                    placeholder={
                      users.length === 0
                        ? "Loading users..."
                        : "Select an author"
                    }
                  />
                </SelectTrigger>
                {users.length > 0 && (
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Authors</SelectLabel>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={String(user.id)}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                )}
              </Select>
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="postContent"
                value={body}
                onChange={onChangeBody}
                placeholder="Content"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              disabled={!canSave}
              onClick={addPost}
              className="w-full"
            >
              Add Post
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
