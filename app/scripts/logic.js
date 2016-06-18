import index from './components/index';
import member from './components/member';
import category from './components/category';
import settings from './components/settings';
import app from './app';
import trs from './transition';
import filter from './filter';

export default function (winObj) {

  let App = app(winObj);

  trs();
  filter();

  let router = new VueRouter({
    hashbang: false,
    history: true,
    linkActiveClass: 'active'
  });

  router.map({
    '/index': {
      component: index
    },
    '/member': {
      component: member
    },
    '/category': {
      component: category
    },
    '/settings':{
      component: settings
    }
  });
  router.start(App, '#app');
  router.go('/settings');
}
