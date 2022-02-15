import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice';
import blockListReducer from './slices/blockListSlice';

export default configureStore({
  reducer: {
    modal: modalReducer,
    blockList: blockListReducer,
  },
});
