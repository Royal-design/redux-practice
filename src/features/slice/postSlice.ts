import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub } from "date-fns";

export interface PostType {
  id: string;
  title: string;
  content: string;
  userId: string;
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

const initialState: PostType[] = [
  {
    id: "1",
    title: "Learning Redux",
    content: "Using the best tutorial",
    userId: "1",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
    }
  },
  {
    id: "2",
    title: "Writing Code",
    content: "Write and refactored by me",
    userId: "0",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
    }
  }
];

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<PostType>) {
        state.push(action.payload);
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
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
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  }
});

export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
