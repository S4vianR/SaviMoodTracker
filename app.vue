<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
  import { inject } from '@vercel/analytics';

  onMounted(() => {
    inject();
  });
</script>

<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}

.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}

div {
  font-family: "Raleway", sans-serif;
  /* font-family: "Playwrite HU", cursive; */
  font-size: 1.6rem;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
