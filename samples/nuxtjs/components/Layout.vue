<template>
  <div>
    <!-- <visitor-identification /> -->
    <Navigation />
    <div v-if="route" class="container">
      <placeholder name="Nuxtjs-jss-main" :rendering="route" />
    </div>
  </div>
</template>

<script>
import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';
// import Navigation from './Navigation';
// import VisitorIdentification from './VisitorIdentification';
import 'bootstrap/dist/css/bootstrap.css';
import '/assets/app.css';

export default {
  name: 'Layout',
  props: {
    route: {
      type: Object,
    },
  },
  components: {
    Placeholder,
    // VisitorIdentification,
  },
};
</script>
