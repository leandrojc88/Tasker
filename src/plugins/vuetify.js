import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: colors.teal.darken2, // blue darken-4
        secondary: colors.teal.darken4, //blue darken-2
        accent: colors.teal.accent1,
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        bggrey: colors.grey.lighten3
      },
    },
  },
  icons: {
    values: {
      edit: 'mdi-pencil',
      task: 'mdi-clipboard-text',
      dashboard: 'mdi-view-dashboard',
      project: 'mdi-briefcase',
      done_project: 'mdi-checkbox-marked-circle-outline',
      add_circle: 'mdi-plus-circle-outline',
      add: 'mdi-plus',
      delete: 'mdi-delete',
      close: 'mdi-close',
      checks: 'mdi-check-box-multiple-outline',
    }
  }
});
