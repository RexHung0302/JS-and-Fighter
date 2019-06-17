import Vue from 'vue'
import Router from 'vue-router'
import star from '@/views/star.vue'
import game from '@/views/game.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'star',
            component: star,
        },
        {
            path: '/game',
            name: 'game',
            component: game,
        }
    ]
})