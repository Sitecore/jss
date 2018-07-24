<template>
  <div>
    <navigation />
    <div class="container">
      <placeholder name="jss-main" :rendering="route" />
    </div>
  </div>
</template>

<script>
import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/app.css';

export default {
  name: 'Layout',
  props: {
    route: {
      type: Object,
      default: () => ({}),
    },
  },
  metaInfo() {
    return {
      title:
        (this.route.fields && this.route.fields.pageTitle && this.route.fields.pageTitle.value) ||
        'Page',
    };
  },
  components: {
    Placeholder,
    Navigation,
  },
};
</script>
