import { Action, configureStore } from '@reduxjs/toolkit'

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
    counter: counterReducer
  }
})