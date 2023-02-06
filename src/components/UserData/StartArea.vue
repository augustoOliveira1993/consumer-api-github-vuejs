<script setup>
import {computed} from "vue";

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
  },
});

const emit = defineEmits(["update:modelValue", "update:modelUser"]);

const theme = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const user = computed({
  get: () => props.modelUser,
  set: (value) => emit("update:modelUser", value),
});
</script>


<template>
  <div class="container" :style="{ background: theme.colors.background }">
    <li class="data">
      <span :style="{ color: theme.colors.textNorm }">Repositório</span>
      <strong :style="{ color: theme.colors.textBolded }">{{ user.repos }}</strong>
    </li>

    <li class="data">
      <span :style="{ color: theme.colors.textNorm }">Followers</span>
      <strong :style="{ color: theme.colors.textBolded }">{{ user.followers }}</strong>
    </li>

    <li class="data">
      <span :style="{ color: theme.colors.textNorm }">Following</span>
      <strong :style="{ color: theme.colors.textBolded }">{{ user.following }}</strong>
    </li>
  </div>
</template>


<style scoped>
.container {
  border-radius: 1rem;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.4rem;
}

li.data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

li.data span {
  font-size: 1.3rem;
  line-height: 1.6rem;
  text-align: center;
}

li.data strong {
  font-weight: bold;
  font-size: 1.8em;
  line-height: 2.4rem;
  margin-top: 0.8rem;
}

@media (min-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 1.8rem 3.2rem;
  }

  li.data {
    align-items: flex-start;
  }

  li.data span {
    font-size: 1.5rem;
  }

  li.data strong {
    margin-top: 1rem;
    font-size: 2.4rem;
  }
}
</style>
