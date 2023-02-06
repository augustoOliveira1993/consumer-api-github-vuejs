import {ref, onMounted} from 'vue'

export const useTheme = () => {
    const lightMode = ref(false)
    const darkTheme = ref({
        colors: {
            background: "#141D2F",
            themeBtn: "#fff",
            card: "#1E2A47",
            textNorm: "#fff",
            textBolded: "#FFF",
        },
    })

    const lightTheme = ref({
        colors: {
            background: "#F6F8FF",
            themeBtn: "#4B6A9B",
            card: "#FEFEFE",
            textNorm: "#697C9A",
            textBolded: "#2B3442",
        },
    })

    const changeTheme = () => {
        lightMode.value = !lightMode.value
        localStorage.setItem('theme', lightMode.value ? 'light' : 'dark');
    }

    const getModeTheme = (mode: string) => {
        return mode === 'light' ? lightTheme.value : darkTheme.value
    }



    onMounted(() => {
        const storedMode = localStorage.getItem('theme');
        storedMode === 'light' && (lightMode.value = true);
        const mode = lightMode.value ? 'light' : 'dark'
        localStorage.setItem('mode', mode);
    })
    return {
        lightMode,
        changeTheme,
        getModeTheme
    }
}
