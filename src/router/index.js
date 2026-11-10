import { createRouter, createWebHistory } from 'vue-router'
import { Home } from '../views/Home.vue'
import { Alerts } from '../views/Alerts.vue'
import { Warframes } from '../views/Warframes.vue'
import { Weapons } from '../views/Weapons.vue'
import { Drops } from '../views/Drops.vue'
import { NotFound } from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path:'/alerts',
      name:'alerts',
      component: Alerts,
    },
    {
      path:'/warframes',
      name:'warframes',
      component: Warframes
    },
    {
      path:'/weapons',
      name:'weapons',
      component: Weapons
    },
    {
      path:'/drops',
      name:'drops',
      component: Drops
    },
    {
      path :'/:pathMatch(.*)*',
      component:NotFound
    }
  ],
})

export default router
