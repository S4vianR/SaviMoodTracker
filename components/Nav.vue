<template>
  <div>
    <div id="title">
      Welcome to <span>Savi Mood Tracker</span>
    </div>
    <LightDarkMode />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
  div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

div > #title {
  font-family: "Playwrite HU", cursive;
}

div > #title > span {
  color: #f5a623;
  text-decoration: underline;
  text-decoration-color: #f5a623;
  margin-left: 7px;
}
</style>
