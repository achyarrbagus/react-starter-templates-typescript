import { createSlice, configureStore } from "@reduxjs/toolkit";

// 1. create reducer
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 1,
  },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state, action) => {
      if (action.payload > state.value) {
        return state;
      }
      state.value -= action.payload;
    },
  },
});

const pingSlice = createSlice({
  name: "ping",
  initialState: {
    value: "pong",
  },
  reducers: {
    ping: (state) => {
      return state;
    },
  },
});

// this is root reducer for saving all of reducer
const rootReducer = {
  counter: counterSlice.reducer,
  ping: pingSlice.reducer,
};

let store = configureStore({
  reducer: rootReducer,
});

// call store to getting info redux is change
store.subscribe(() => console.log(store.subscribe));

export default store;
