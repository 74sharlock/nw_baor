import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routerMap from './router'
import VueElectron from './plugin/electron'
import common from './plugin/common'
import filters from './filter'

Vue.use(VueRouter);
Vue.use(VueElectron);
Vue.use(common);

Object.keys(filters).forEach((key)=>{
    Vue.filter(key, filters[key]);
});


const router = new VueRouter({
    /*hashbang: false,
    history: true,*/
    linkActiveClass: 'active'
});

routerMap(router);

router.start(App, '#root'); 


let leaveClass = '';
let enterClass = '';

Vue.transition('fadeSlide', {

    beforeEnter (el) {
        let prevPriority = this.$router._prevTransition.activateQueue[0].pageData.priority, nextPriority = this.$route.pageData.priority;
        enterClass = prevPriority < nextPriority ? 'fadeInRight' : 'fadeInLeft';
        el.classList.add(enterClass);
    },
    enter (el) {
        //console.log('enter');
    },
    afterEnter (el) {
        el.classList.remove(enterClass);
    },
    enterCancelled (el) {
        // handle cancellation
    },

    beforeLeave (el) {
        let prevPriority = this.$router._prevTransition.activateQueue[0].pageData.priority, nextPriority = this.$route.pageData.priority;
        leaveClass = prevPriority < nextPriority ? 'fadeOutLeft' : 'fadeOutRight';
        el.classList.add(leaveClass);
    },
    leave (el) {
        //console.log('leave');
    },
    afterLeave (el) {
        el.classList.remove(leaveClass);
    },
    leaveCancelled (el) {
        // handle cancellation
    }
});
