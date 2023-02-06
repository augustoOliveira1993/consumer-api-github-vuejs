<script setup>
import TopArea from "./components/TopArea.vue";
import Index from "./components/UserData/Index.vue";
import {onMounted, onUpdated, ref} from "vue";
import {useTheme} from "./composables/useTheme";
const {getModeTheme} = useTheme()

const theme = ref(getModeTheme(localStorage.getItem("theme")))
const user = ref(null)

onMounted(() => {
    theme.value = getModeTheme(localStorage.getItem("theme"))
})

onUpdated(() => {
  theme.value = getModeTheme(localStorage.getItem("theme"))
})
</script>

<template>
  <main class="container" :style="{background: theme.colors.background}">

    <TopArea v-model="theme" v-model:model-user="user"/>
    <Index v-if="user && user.login !== ''" v-model="theme" v-model:model-user="user"/>
  </main>
</template>

<style scoped>
main.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.1rem 2.4rem;
}

@media screen and (min-width: 768px) {
  main.container {
    padding: 3.1rem 7rem;
  }
}

</style>
