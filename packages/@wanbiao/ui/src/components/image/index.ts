import { App } from 'vue'
import WbImage from './index.vue'
WbImage.install = (app: App) => {
  app.component(WbImage.name, WbImage)
}
export default WbImage
