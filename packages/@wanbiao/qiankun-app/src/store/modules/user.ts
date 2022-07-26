import { login, logout, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { Commit } from 'vuex';
import type { LoginParams } from '@/entity/user.d';
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
  //用户登录
  login({ commit }: { commit: Commit }, userInfo: LoginParams) {
    const { username, password } = userInfo;
    return new Promise<void>((resolve, reject) => {
      login({ username: username?.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit('SET_TOKEN', data.token);
          setToken(data.token);
          sessionStorage.setItem('token', data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 用户信息获取
  getInfo({ commit, state }: { commit: Commit; state: UserState }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token as string)
        .then((response) => {
          const { data } = response;
          if (!data) {
            return reject('Verification failed, please Login again.');
          }
          const { name, avatar } = data;
          commit('SET_NAME', name);
          commit('SET_AVATAR', avatar);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 登出
  logout({ commit }: { commit: Commit; state: UserState }) {
    return new Promise<void>((resolve, reject) => {
      logout()
        .then(() => {
          removeToken();
          // resetRouter();
          commit('RESET_STATE');
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // token清空
  resetToken({ commit }: { commit: Commit }) {
    return new Promise<void>((resolve) => {
      removeToken(); // must remove  token  first
      commit('RESET_STATE');
      resolve();
    });
  }
};

const getters = {
  token: (state) => state.token,
  avatar: (state) => state.avatar,
  name: (state) => state.name
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
