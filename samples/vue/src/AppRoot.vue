<!--
-->
<template>
  <div id="root">
    <context-view :visible="contextViewVisible" />
    <!-- 'router-view' is a "global" component that is injected into the Vue component registry by vue-router. -->
    <router-view />
    <div v-if="languageIsChanging" class="alert alert-info">Language is changing...</div>
  </div>
</template>

<script>
import ContextView from './ContextView';
import { dictionaryServiceFactory } from './lib/dictionary-service-factory';

export default {
  name: 'AppRoot',
  data() {
    return {
      languageIsChanging: false,
      contextViewVisible: false,
    };
  },
  methods: {
    changeAppLanguage(language) {
      const i18n = this.$i18n;
      if (i18n.locale !== language) {
        // Changing languages is an async action, therefore the `languageIsChanging` property can be used
        // to show a loading/switching screen when language is being changed.
        this.languageIsChanging = true;

        dictionaryServiceFactory.fetchDictionaryData(language).then((phrases) => {
          i18n.setLocaleMessage(language, phrases);
          i18n.locale = language;

          this.languageIsChanging = false;
        });
      }
    },
    toggleContextView() {
      this.contextViewVisible = !this.contextViewVisible;
    },
  },
  provide() {
    // Use Vue's provide/inject capabilities to "provide" functions to
    // any descendant component that want to use/"inject" the functions.
    return {
      languageIsChanging: this.languageIsChanging,
      changeAppLanguage: this.changeAppLanguage,
      toggleContextView: this.toggleContextView,
    };
  },
  components: {
    ContextView,
  },
};
</script>
