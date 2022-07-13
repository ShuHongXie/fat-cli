import Cookies from 'js-cookie';
import { Commit, ActionContext, Action, Payload } from 'vuex';

export type AppState = {
  sidebar: {
    opened: boolean | string | undefined;
    withoutAnimation: boolean;
  };
  device: string;
};

const state: AppState = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop'
};

const mutations = {
  TOGGLE_SIDEBAR: (state: AppState) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1');
    } else {
      Cookies.set('sidebarStatus', '0');
    }
  },
  CLOSE_SIDEBAR: (state: AppState, withoutAnimation: boolean) => {
    Cookies.set('sidebarStatus', '0');
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state: AppState, device: string) => {
    state.device = device;
  }
};

const actions = {
  toggleSideBar({ commit }: { commit: Commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  closeSideBar({ commit }: { commit: Commit }, { withoutAnimation }: { withoutAnimation: string }) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }: { commit: Commit }, device: string) {
    commit('TOGGLE_DEVICE', device);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
