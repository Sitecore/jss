<template>
  <div>
    <visitor-identification />
    <navigation />
    <div class="container">
      <placeholder name="jss-main" :rendering="route" />
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import './assets/app.css';

const Placeholder = () => import('@sitecore-jss/sitecore-jss-vue').then((m) => m.Placeholder);
const Navigation = () => import('./Navigation');
const VisitorIdentification = () => import('./VisitorIdentification');

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
    VisitorIdentification,
  },
};
</script>
