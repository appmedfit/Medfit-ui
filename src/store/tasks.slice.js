import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "12gujh122",
    description: "Learn Javascript",
    time: 0,
    isComplete: true
  },
  { id: "12gujh232", description: "Learn React", time: 5, isComplete: false }
];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addItemTotask(state, { payload }) {
      state.unshift(payload);
    },
    updateItemInTask(state, { payload }) {
      const index = state.findIndex((item) => item.id === payload.id);
      state.splice(index, 1, payload);
    },
    removeItemFromtask(state, { payload }) {
      //   console.log(payload);
      const index = state.findIndex((item) => item.id === payload.id);
      state.splice(index, 1);
    }
  }
});

export const {
  addItemTotask,
  removeItemFromtask,
  updateItemInTask
} = taskSlice.actions;
export default taskSlice.reducer;
