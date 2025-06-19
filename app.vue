<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-grow">
      <NuxtPage />
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
import TheFooter from '~/components/TheFooter.vue';
</script>