// import { login, logout, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
// import { resetRouter } from '@/router';

export type UserState = {
  token?: string;
  name?: string;
  avatar?: string;
};

const getDefaultState = () => ({
  token: getToken(),
  name: '',
  avatar: ''
});

const state: UserState = getDefaultState();

const mutations = {
  RESET_STATE: (state: UserState) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state: UserState, token: string) => {
    state.token = token;
  },
  SET_NAME: (state: UserState, name: string) => {
    state.name = name;
  },
  SET_AVATAR: (state: UserState, avatar: string) => {
    state.avatar = avatar;
  }
};

const actions = {
  // //用户登录
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo;
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password })
  //       .then((response) => {
  //         const { data } = response;
  //         commit('SET_TOKEN', data.token);
  //         setToken(data.token);
  //         resolve();
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },
  // // 用户信息获取
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token)
  //       .then((response) => {
  //         const { data } = response;
  //         if (!data) {
  //           return reject('Verification failed, please Login again.');
  //         }
  //         const { name, avatar } = data;
  //         commit('SET_NAME', name);
  //         commit('SET_AVATAR', avatar);
  //         resolve(data);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },
  // // user logout
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token)
  //       .then(() => {
  //         removeToken(); // must remove  token  first
  //         resetRouter();
  //         commit('RESET_STATE');
  //         resolve();
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },
  // // remove token
  // resetToken({ commit }) {
  //   return new Promise((resolve) => {
  //     removeToken(); // must remove  token  first
  //     commit('RESET_STATE');
  //     resolve();
  //   });
  // }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
