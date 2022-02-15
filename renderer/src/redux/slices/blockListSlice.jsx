import { createSlice } from '@reduxjs/toolkit';

export const blockListSlice = createSlice({
  name: 'blockList',
  initialState: {
    blocks: [],
  },
  reducers: {
    addBlock: (state, action) => {
      state.blocks = () => {
        if (state.blocks.length > 0) {
          if (action.type === 'logic') {
            return [
              ...state.blocks.slice(0, action.index),
              action.payload,
              ...state.blocks.slice(action.index),
            ];
            // eslint-disable-next-line no-else-return
          } else if (action.type === 'workspace') {
            let itemIndex = action.index;
            console.log({ index: action.index, itemIndex });
            const newArr = [
              ...state.blocks.slice(0, action.index),
              action.payload,
              ...state.blocks.slice(action.index),
            ];
            if (itemIndex > action.index) {
              itemIndex += 1;
            }
            return newArr.filter((item, index) => index !== itemIndex);
          }
        }
        return [action.payload];
      };
    },
  },
});

export const { addBlock } = blockListSlice.actions;

export default blockListSlice.reducer;
