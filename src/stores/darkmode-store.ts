import {defineStore} from 'pinia'
import {reactive} from 'vue'

export const useDarmodeStore = defineStore({
    id: 'darkmode',
    state: () => reactive({
        lightMode: false,
        lightTheme: {
            colors: {
                background: "#F6F8FF",
                themeBtn: "#4B6A9B",
                card: "#FEFEFE",
                textNorm: "#697C9A",
                textBolded: "#2B3442",
            },
        },
        darkTheme: {
            colors: {
                background: "#141D2F",
                themeBtn: "#fff",
                card: "#1E2A47",
                textNorm: "#fff",
                textBolded: "#FFF",
            },
        }
    }),
    getters: {
        GET_DARKMODE() {
            return localStorage.getItem('currentChannel') === 'light' ? this.lightTheme : this.darkTheme;
        },

    },
    actions: {
        SET_DARKMODE() {
            this.lightMode = !this.lightMode;
            localStorage.setItem('currentChannel', this.lightMode ? 'light' : 'dark');
        },

    }
})
