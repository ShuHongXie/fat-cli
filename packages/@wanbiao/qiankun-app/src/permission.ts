import router from './router';
import store from './store';
import { ElMessage } from 'element-plus';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';
import isEqual from 'lodash.isequal';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  console.log(
    'beforeEach Execute',
    to.fullPath,
    from.fullPath,
    isEqual(to.params, from.params),
    isEqual(to.query, from.query)
  );
  if (
    to.fullPath === from.fullPath &&
    isEqual(to.params, from.params) &&
    isEqual(to.query, from.query)
  ) {
    // next(false);
    // return false;
  }

  if (!history.state.current) {
    Object.assign(history.state, { current: from.fullPath });
  }
  NProgress.start();
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();
  console.log(hasToken, to);

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' });
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.name;
      if (hasGetUserInfo) {
        console.log('111');
        next();
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo');
          console.log('222');
          next();
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken');
          ElMessage.error((error as string) || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
