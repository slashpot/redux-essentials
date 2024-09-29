import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { sub } from 'date-fns'

// Define a TS type for the data we'll be using
export interface Post {
  id: string
  title: string
  content: string
  date: string
  user: string
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

// Create an initial state value for the reducer, with that type
const initialState: Post[] = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    user: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    user: '1',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
]

// Create the slice and pass in the initial state
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Declare a "case reducer" named `postAdded`.
    // The type of `action.payload` will be a `Post` object.
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: { id: nanoid(), title, content, user: userId, date: new Date().toISOString() },
        }
      },
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
  selectors: {
    // Note that these selectors are given just the `PostsState`
    // as an argument, not the entire `RootState`
    selectAllPosts: (postsState) => postsState,
    selectPostById: (postsState, postId: string) => {
      return postsState.find((post) => post.id === postId)
    },
  },
})

export const { postAdded, postUpdated } = postsSlice.actions

// Export the generated reducer function
export const postsReducer = postsSlice.reducer

export const selectAllPosts = postsSlice.selectors.selectAllPosts
export const selectPostById = postsSlice.selectors.selectPostById
