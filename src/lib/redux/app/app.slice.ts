import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface IAppState {
  sidebarCollapsed: boolean;
}

const initialState: IAppState = {
  sidebarCollapsed: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    sidebarCollapseToggle: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const { sidebarCollapseToggle } = appSlice.actions;

export default appSlice.reducer;
