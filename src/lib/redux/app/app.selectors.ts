import { RootState } from '@/lib/redux/store';

export const getSidebarCollapsed = (state: RootState) =>
  state.app.sidebarCollapsed;
