<template>
  <div>
    <button id="lightColorButton" ref="lightColorButton" @click="lightMode">
      <img src="/icons/light-off.svg" alt="Light" ref="lightMode" />
    </button>
    <button id="darkColorButton" ref="darkColorButton" @click="darkMode">
      <img src="/icons/dark-off.svg" alt="Dark" ref="darkMode" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
const lightOn = "/icons/light-on.svg";
const lightOff = "/icons/light-off.svg";
const darkOn = "/icons/dark-on.svg";
const darkOff = "/icons/dark-off.svg";

const lightModeImg = ref<HTMLImageElement | null>(null);
const darkModeImg = ref<HTMLImageElement | null>(null);
const lightColorButton = ref<HTMLButtonElement | null>(null);
const darkColorButton = ref<HTMLButtonElement | null>(null);

onMounted(() => {
  lightModeImg.value = document.querySelector("#lightColorButton img");
  darkModeImg.value = document.querySelector("#darkColorButton img");
});

// Función para actualizar el source de las imágenes
const updateImagesSource = () => {
  if (colorMode.value === "light") {
    if (lightModeImg.value) lightModeImg.value.src = lightOn;
    if (darkModeImg.value) darkModeImg.value.src = darkOff;
    darkColorButton.value?.classList.remove("darkOn");
    lightColorButton.value?.classList.add("lightOn");
    // Change the prefers-color-scheme
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    if (lightModeImg.value) lightModeImg.value.src = lightOff;
    if (darkModeImg.value) darkModeImg.value.src = darkOn;
    lightColorButton.value?.classList.remove("lightOn");
    darkColorButton.value?.classList.add("darkOn");
    // Change the prefers-color-scheme
    document.documentElement.setAttribute("data-theme", "dark");
  }
};

// Observa cambios en colorMode y actualiza las imágenes
watch(colorMode, updateImagesSource);

// Asegura que las imágenes se actualicen al montar el componente
onMounted(updateImagesSource);

// Change color mode to light
const lightMode = () => {
  colorMode.value = "light";
  console.log(lightModeImg.value);
};

// Change color mode to dark
const darkMode = () => {
  colorMode.value = "dark";
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.875rem;
}

button {
  padding: 0.2rem 0.6rem;
  border: 2px solid rgba(57, 57, 57, 1);
  background-color: rgba(57, 57, 57, 0.2);
  border-radius: 0.5rem;
  cursor: pointer;
}

.lightOn {
  border-color: rgba(240, 187, 64, 1);
  background-color: rgba(240, 187, 64, 0.2);
}

.darkOn {
  border-color: rgba(66, 110, 149, 1);
  background-color: rgba(66, 110, 149, 0.2);
}
</style>
