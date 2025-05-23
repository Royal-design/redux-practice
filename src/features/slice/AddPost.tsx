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
import { postAdded } from "./postSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/Components/ui/select";

export const AddPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onAuthorChange = (value: string) => setUserId(value);

  const addPost = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle("");
      setContent("");
      setUserId("");
    }
  };

  const userItem = users.map((user) => (
    <SelectItem key={user.id} value={user.id}>
      {user.name}
    </SelectItem>
  ));
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
  return (
    <div>
      <form onClick={addPost}>
        <Card className="w-sm">
          <CardHeader>
            <CardTitle>Add Post</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                name="postTitle"
                value={title}
                onChange={onChangeTitle}
                placeholder="title"
              />
            </div>
            <div className="">
              <Label htmlFor="user">Author</Label>
              <Select value={userId} onValueChange={onAuthorChange}>
                <SelectTrigger id="user" className="w-full">
                  <SelectValue placeholder="Select a author" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Author</SelectLabel>
                    {userItem}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="postContent"
                value={content}
                onChange={onChangeContent}
                placeholder="content"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="button" disabled={!canSave}>
              Add Post
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
