<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content }}</template>
  </metainfo>
  <div>
    <visitor-identification />
    <navigation />
    <div class="container">
      <placeholder name="JssVueWeb-jss-main" :rendering="route" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';
import Navigation from './Navigation';
import VisitorIdentification from './VisitorIdentification';
import { useMeta } from 'vue-meta';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/app.css';

export default defineComponent({
  name: 'Layout',
  props: {
    route: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    useMeta({
      title:
        (props.route.fields &&
          props.route.fields.pageTitle &&
          props.route.fields.pageTitle.value) ||
        'Page',
    });
  },
  components: {
    Placeholder,
    Navigation,
    VisitorIdentification,
  },
});
</script>
