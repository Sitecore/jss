<template>  
  <div>
    <Navigation />
    <div class="container">
      <Layout :route="route" />    
    </div>
    <!--We could use <NuxtLayout here, but client routing stops working if we do-->
  </div>
</template>

<script setup>
  const route = useRoute();
  import 'bootstrap/dist/css/bootstrap.css';
  import '/assets/app.css';
</script>
