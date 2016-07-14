const yes = true;
const no = false;

export const routerMap = {
    '/': {
        pageData: {
            modelName: 'home',
            pageTitle: '首页',
            needBack: no,
            needMenu: yes,
            icon: 'home',
            priority: 0
        },
        component: require('./components/pages/index.vue')
    },
    '/detail/:date':{
        outOfNav: yes,
        pageData: {
            modelName: 'home',
            pageTitle: '明细',
            needBack: yes,
            needMenu: no,
            icon: 'home',
            priority: 2
        },
        component: require('./components/pages/detail.vue')
    },
    '/category': {
        pageData: {
            modelName: 'category',
            pageTitle: '分类',
            needBack: no,
            needMenu: yes,
            linkReplace: yes,
            icon: 'leaf',
            priority: 1
        },
        component: require('./components/pages/category.vue')
    },
    '/member': {
        pageData: {
            modelName: 'member',
            pageTitle: '成员',
            needBack: no,
            needMenu: yes,
            linkReplace: yes,
            icon: 'user',
            priority: 1
        },
        component: require('./components/pages/member.vue')
    },
    '/analysis': {
        pageData: {
            modelName: 'analysis',
            pageTitle: '分析',
            needBack: no,
            needMenu: yes,
            linkReplace: yes,
            icon: 'bar-chart',
            priority: 1
        },
        component: require('./components/pages/analysis.vue')
    },
    '/settings': {
        pageData: {
            modelName: 'settings',
            pageTitle: '设置',
            needBack: no,
            needMenu: yes,
            linkReplace: yes,
            icon: 'cogs',
            priority: 1
        },
        component: require('./components/pages/settings.vue')
    }
};

export default function (router) {
    router.map(routerMap);
}
