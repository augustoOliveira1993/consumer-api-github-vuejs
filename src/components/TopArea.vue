<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useTheme} from "../composables/useTheme";
import {UserProps} from '../types'
import {joinedDate} from "../utils/formatter";
import { useRoute} from 'vue-router'
import {useDarmodeStore} from "../stores/darkmode-store";
const storeDarmode = useDarmodeStore()
const route = useRoute()
const {lightMode, changeTheme} = useTheme()
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

const emit = defineEmits(["update:modelValue", "update:modelUser"])

const theme = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
})

const useData = computed({
  get: () => props.modelUser,
  set: (value) => emit("update:modelUser", value),
})

const notFound = ref(false)
const empty = ref(false)
const usernameRef = ref('')
const hadleSubmit = () => {
  if(usernameRef.value.trim() === '' || typeof usernameRef.value === 'undefined') {
    empty.value = true
    useData.value = {
      login: "",
      name: "",
      bio: "",
      avatar_url: "",
      html_url: "",
      followers: 0,
      following: 0,
      public_repos: 0,
      created_at: "",
    }
    return
  }
  empty.value = false;

  fetchUser(usernameRef.value)
}
const fetchUser = async (username: string) => {
  await fetch(`https://api.github.com/users/${username}`)
      .then(res => {
        if (res.status !== 200) {
          notFound.value = true
          useData.value = {
            login: "",
            name: "",
            bio: "",
            avatar_url: "",
            html_url: "",
            followers: 0,
            following: 0,
            public_repos: 0,
            created_at: "",
          }
          return
        }
        notFound.value = false
        return res.json()
      })
      .then(data => {
        const user: UserProps = {
          pfp: data.avatar_url,
          name: data.name,
          joinedAt: joinedDate(data.created_at),
          username: data.login,
          bio: data.bio,
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          links: {
            location: data.location,
            twitter: data.twitter_username,
            company: data.company,
            blog: data.blog,
          },
        };
        useData.value = user
      })
}

onMounted(() => {
  console.log(storeDarmode.lightMode)
  if(route.query.username) {
    fetchUser(route.query.username as string)
  }
})
</script>

<template>
  <header>
    <div class="theme-area">
      <div>ASA Quality System</div>
      <button @click="changeTheme" class="chage-theme-btn" :style="{ color: theme.colors.themeBtn }" type="button">
        <div v-if="!lightMode">
          <span>DARK</span>
          <img src="/assets/icon-moon.svg" alt="dark mode"/>
        </div>
        <div v-if="lightMode">
          <span>LIGHT</span>
          <img src="/assets/icon-sun.svg" alt="light mode"/>
        </div>
      </button>
    </div>

    <form class="input-area" @submit.prevent="hadleSubmit" :style="{ background: theme.colors.card}">
      <label class="input-label">
        <img src="/assets/icon-search.svg" alt="search .."/>
      </label>
      <input  v-model="usernameRef" :style="{color: theme.colors.textNorm}" name="username"
             id="username"
             type="text"
             placeholder="Digite o nome do usuário"
      />
      <small class="warn" v-if="empty && !notFound">
        Digite o nome do usuário
      </small>
      <small class="warn" v-if="notFound && !empty">
        Usuário não encontrado
      </small>
      <button class="submit-btn" type="submit">Seacrch</button>
    </form>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  max-width: 73.3rem;
}

.theme-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 2rem;
  color: #744bc5;
}

button.chage-theme-btn {
  display: flex;
  align-items: center;
  border: none;
  background: none;
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 1.9rem;
  letter-spacing: 0.25rem;
  cursor: pointer;
}

button.chage-theme-btn img {
  margin-left: 1.6rem;
}

.input-area {
  margin-top: 3.6rem;
  border-radius: 1.5rem;
  box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.198567);
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0.7rem 0.7rem 1.6rem;
  transition: height 0.3s ease;
  position: relative;

}

.input-label {
  height: 2.4rem;
  cursor: pointer;
}

input {
  flex: 1;
  font-style: normal;
  font-weight: normal;
  font-size: 1.4rem;
  line-height: 192%;
  background: none;
  border: none;
  margin: 0 0.8rem;
}

input:focus {
  outline: 1px dashed #7a65ad;
}

.submit-btn {
  background: #7a65ad;
  border: none;
  height: 100%;
  border-radius: 1rem;
  line-height: 2.1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  width: 8.4rem;
  transition: all 0.3s ease-out;
}

.submit-btn:hover {
  filter: brightness(1.05);
  box-shadow: 0 0 15px -3px #7a65ad;
}

.warn {
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2.2rem;
  color: #f74646;
  margin-right: 2.4rem;
}

@media (min-width: 768px) {
  .input-area {
    height: 6.9rem;
  }

  input {
    font-size: 1.7rem;
    margin: 0 2.4rem;
  }


  .submit-btn {
    width: 10.6rem;
    font-size: 1.7rem;
  }
}


</style>
