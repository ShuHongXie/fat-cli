import defaultSettings from '@/config/settings';
import { Commit } from 'vuex';

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings;

export type SettingsState = {
  showSettings: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
};

const state: SettingsState = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
};

const mutations = {
  CHANGE_SETTING: (
    state: SettingsState,
    { key, value }: { key: keyof SettingsState; value: boolean }
  ) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  }
};

const actions = {
  changeSetting(
    { commit }: { commit: Commit },
    data: { key: keyof SettingsState; value: boolean }
  ) {
    commit('CHANGE_SETTING', data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
