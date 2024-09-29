import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { postsReducer } from '@/features/posts/postsSlice'
import { usersReducer } from '@/features/users/usersSlice'
import { authReducer } from '@/features/auth/authSlice'

interface CounterState {
  value: number
}

function counterReducer(state: CounterState = { value: 0}, action: Action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    auth: authReducer,
  }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>