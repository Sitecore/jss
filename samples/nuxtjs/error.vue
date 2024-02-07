<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <p>{{error.message}}</p>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { NuxtError } from "nuxt/app";

const props = defineProps({
  error: Object as () => NuxtError
})
</script>