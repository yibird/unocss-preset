import DefaultTheme from 'vitepress/theme'
import OverlayDemo from './components/OverlayDemo.vue'
import './custom.css'
import 'uno.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('OverlayDemo', OverlayDemo)
  },
}
