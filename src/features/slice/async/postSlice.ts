import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from "@reduxjs/toolkit";

import axios from "axios";
import { sub } from "date-fns";

export interface PostType {
  id: string; // Keep as string for consistency
  title: string;
  body: string;
  userId: number;
  date: string;
  reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
}

interface ReactionPayload {
  postId: string;
  reaction: keyof PostType["reactions"];
}

type StatusProps = "idle" | "loading" | "succeeded" | "failed";

interface StateType {
  posts: PostType[];
  status: StatusProps;
  error: string | null;
}

const initialState: StateType = {
  posts: [],
  status: "idle",
  error: null
};

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk<PostType[]>(
  "posts/fetchPosts",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

export const addNewPost = createAsyncThunk<
  PostType,
  Omit<PostType, "id" | "date" | "reactions">
>("posts/addPost", async (newPostData) => {
  const newPost = {
    ...newPostData
  };

  // Generate unique ID before API call since JSONPlaceholder always returns 101
  const uniqueId = `new-${nanoid()}`;

  const response = await axios.post(BASE_URL, newPost);

  // Use our generated ID instead of the API response ID
  return {
    ...response.data,
    ...newPostData, // Ensure our data is preserved
    id: uniqueId, // Use our unique ID
    date: new Date().toISOString(),
    reactions: {
      thumbsUp: 0,
      coffee: 0,
      heart: 0,
      rocket: 0,
      wow: 0
    }
  };
});

export const asyncPostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<PostType>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, body: string, userId: number) {
        return {
          payload: {
            id: `local-${nanoid()}`, // Prefix local IDs
            title,
            body,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          }
        };
      }
    },
    reactionAdded: (state, action: PayloadAction<ReactionPayload>) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Clear existing posts to avoid duplicates
        state.posts = [];

        let min = 1;

        const loadedPosts = action.payload.map((post: any) => ({
          ...post,
          id: `api-${post.id}`, // Prefix API IDs to ensure uniqueness
          date: sub(new Date(), { minutes: min++ }).toISOString(),
          reactions: {
            thumbsUp: 0,
            coffee: 0,
            heart: 0,
            rocket: 0,
            wow: 0
          }
        }));

        state.posts.push(...loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  }
});

export const { postAdded, reactionAdded } = asyncPostSlice.actions;
