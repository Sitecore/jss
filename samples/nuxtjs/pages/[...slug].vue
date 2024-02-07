<template>  
  <div>
    <Navigation />
    <div class="container">
      <Layout :route="route" />    
    </div>
  </div>
</template>

<script setup>
  const route = useRoute();
  import 'bootstrap/dist/css/bootstrap.css';
  import '/assets/app.css';
</script>
