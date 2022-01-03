<template>
  <div
    class="
      d-flex
      flex-column flex-md-row
      align-items-center
      p-3
      px-md-4
      mb-3
      bg-white
      border-bottom
    "
  >
    <h5 class="my-0 mr-md-auto font-weight-normal">
      <a href="/" class="text-dark">
        <img :src="logoImg" alt="Sitecore" />
      </a>
    </h5>
    <nav class="my-2 my-md-0 mr-md-3">
      <a
        class="p-2 text-dark"
        href="https://jss.sitecore.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ $t('Documentation') }}
      </a>
      <a href="/styleguide" class="p-2 text-dark">
        {{ $t('Styleguide') }}
      </a>
      <a href="/graphql" class="p-2 text-dark">
        {{ $t('GraphQL') }}
      </a>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      contextButtonText: '',
      logoImg: '/assets/sc_logo.svg',
    };
  },
};
</script>
