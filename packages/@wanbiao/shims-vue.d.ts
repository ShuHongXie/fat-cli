/* eslint-disable */
declare module "*" {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.ts' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
