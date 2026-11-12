import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Warframes from '@/views/Warframes.vue'
import Weapons from '@/views/Weapons.vue'
import NotFound from '@/views/NotFound.vue'
import WeaponSpec from '@/views/WeaponSpec.vue'
import WarframeSpec from '@/views/WarframeSpec.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path:'/warframes',
      name:'warframes',
      component: Warframes
    },
    {
      path:'/warframes/:id',
      name:'warframeSpec',
      component: WarframeSpec
    },
    {
      path:'/weapons',
      name:'weapons',
      component: Weapons
    },
    {
      path: '/weapons/:id',
      name: 'weaponSpec',
      component: WeaponSpec
    },
    {
      path :'/:pathMatch(.*)*',
      component:NotFound
    }
  ],
})

export default router
