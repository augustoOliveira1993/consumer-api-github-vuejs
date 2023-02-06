<script setup>
import {computed} from "vue";
import TopArea from "./TopArea.vue";
import StartArea from "./StartArea.vue";
import LinksArea from "./LinksArea.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: {
      colors: {
        background: "#F6F8FF",
        themeBtn: "#4B6A9B",
        card: "#FEFEFE",
        textNorm: "#697C9A",
        textBolded: "#2B3442",
      },
    },
  },
  modelUser: {
    type: Object,
    default: {
      login: "",
      name: "",
      bio: "",
      avatar_url: "",
      html_url: "",
      followers: 0,
      following: 0,
      public_repos: 0,
      created_at: "",
    },
  }
})
const emit = defineEmits(["update:modelValue", "update:modelUse"])

const theme = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
})

const user = computed({
  get: () => props.modelUser,
  set: (value) => emit("update:modelUser", value),
})
</script>

<template>
  <section class="container" :style="{ background: theme.colors.card}">
    <img :src="user.pfp" :alt="user.name" class="pfp">
    <div class="sidebar">
      <TopArea
          v-model:model-value="theme"
          v-model:modelUser="user"
      />

      <StartArea
          v-model:model-value="theme"
          v-model:modelUser="user"
      />

      <LinksArea
          v-model:model-value="theme"
          v-model:model-links="user.links"
      />
    </div>
  </section>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 3rem 2.4rem;

  border-radius: 1.5rem;
  margin-top: 1.6rem;
  max-width: 73.3rem;
  box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.198567);
  display: flex;
}

.pfp {
  height: 117px;
  width: 117px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-right: 3.7rem;
  display: none;
}

.sidebar {
  width: 100%;
}

@media (min-width: 768px) {

  .container {
    padding: 5.2rem 4.8rem;
  }
}

@media (min-width: 900px) {
  .container {
    padding: 4.8rem;
  }

  .pfp {
    display: block;
  }
}
</style>
