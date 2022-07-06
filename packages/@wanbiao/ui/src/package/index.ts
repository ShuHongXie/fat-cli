import button from './button';
import empty from './empty';
import icon from './icon';
import image from './image';
import list from './list';
import load from './load';
import loading from './loading';
import transitionBox from './transition-box';
console.log(transitionBox);

import type { App, Plugin, DefineComponent } from 'vue';

type SFCWithInstall<T> = T & Plugin;

const components = [
  button,
  empty,
  icon,
  image,
  list,
  load,
  loading,
  transitionBox
] as SFCWithInstall<DefineComponent>[];

const install = (app: App): void => {
  for (const key in components) {
    const item = components[key];
    app.use(item);
  }
};

export default { install, title: '总入口' };
