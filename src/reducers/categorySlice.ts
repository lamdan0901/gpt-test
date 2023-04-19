// import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CategoryResponse = {
  total: 0,
  categories: [],
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

// export const { updateCategories } = categorySlice.actions;

export default categorySlice.reducer;
