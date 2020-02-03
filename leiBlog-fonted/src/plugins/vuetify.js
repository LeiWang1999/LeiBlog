import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'


Vue.use(Vuetify, {
  theme: {
    primary: '#CBAA5C',
    secondary: '#083759'
  },
  iconfont: 'mdi'
})
export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#CBAA5C', // #E53935
        secondary: '#083759',
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
})