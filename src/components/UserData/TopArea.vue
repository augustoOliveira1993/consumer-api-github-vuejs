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
  <div class="info">
    <img :src="user.pfp" alt="" class="pfp">
    <div class="side-info">
      <strong class="name" :style="{ color: theme.colors.textBolded }">{{ user.name }}</strong>
      <span class="username">
        <a :href="`https://github.com/${user.username}`">@{{ user.username }}</a>
      </span>

      <span class="joined-at" :style="{ color: theme
      .colors.textNorm }">
        {{ user.joinedAt }}
      </span>
    </div>
  </div>
  <p class="bio" :style="{ color: theme.colors.textNorm }">
    {{ user.bio }}
  </p>
</template>

<style scoped>
div.info {
  display: flex;
  align-items: center;
}

img.pfp {
  height: 75px;
  width: 75px;
  border-radius: 50%;
  margin-right: 2rem;
}

.side-info {
  display: grid;
}

strong.name {
  font-weight: bold;
  font-size: 1.7rem;
  line-height: 2.4rem;
}

span.username {
  font-size: 1.4rem;
  line-height: 2rem;

  margin-top: 1rem;
  margin-bottom: 0.6rem;
}

span.joined-at {
  font-size: 1.4rem;
  line-height: 2rem;
}
p.bio {
  font-size: 1.4rem;
  line-height: 192%;
  margin: 3.3rem 0 2.3rem;
  border: 1px solid #fff;
  padding: 1rem;
  border-radius: 0.5rem;
}
@media screen and (min-width: 768px) {
  img.pfp {
    width: 117px;
    height: 117px;
    margin-right: 4.1rem;
  }

  strong.name {
    font-size: 2.7rem;
  }
  span.username {
    font-size: 1.6rem;
    margin-top: 0.5rem;
  }
  span.joined-at {
    font-size: 1.6rem;
  }
  p.bio {
    margin: 2.2rem 0 3.3rem;
    font-size: 1.6rem;
  }
}

@media screen and (min-width: 900px) {
  img.pfp {
    display: none;
  }

  .side-info {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
  }

  .side-info span:last-of-type {
    grid-column: 2 /3;
    grid-row: 1 /2;
    justify-self: end;
  }
}

</style>
