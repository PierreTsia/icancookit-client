import Vue from "vue";
import Vuetify from "vuetify/lib";
import fr from "vuetify/src/locale/fr";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { fr },
    current: "fr"
  },
  theme:{
    themes:{
      light:{
        primary: '#E53935',
        secondary: '#E53935',
        accent: '#E53935',
        error: '#E53935',
        background: '#E53935',
        grey: "#F4F5F7",
        darkgrey: "#E2E4E9"
      }

    }

  }
});
