import type { AppState } from './modules/app';
import type { UserState } from './modules/user';

const getters = {
  sidebar: (state: { app: AppState }) => state.app.sidebar,
  device: (state: { app: AppState }) => state.app.device,
  token: (state: { user: UserState }) => state.user.token,
  avatar: (state: { user: UserState }) => state.user.avatar,
  name: (state: { user: UserState }) => state.user.name
};
export default getters;
