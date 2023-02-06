// imports de routes vue-router
import {createRouter, createWebHistory} from 'vue-router'

// import de composant
import Home from '../App.vue'

// création du router
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
]
// export routes
export default createRouter({
    history: createWebHistory(),
    routes
})
