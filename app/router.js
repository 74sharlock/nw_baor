const yes = true;
const no = false;

export default function (router) {
    router.map({
        '/': {
            pageData: {
                modelName: 'home',
                pageTitle: '首页',
                needBack: no,
                needMenu: yes,
                priority: 0
            },
            component: require('./components/pages/index.vue')
        },
        '/detail/:date':{
            pageData: {
                modelName: 'detail',
                pageTitle: '明细',
                needBack: yes,
                needMenu: no,
                priority: 2
            },
            component: require('./components/pages/detail.vue')
        },
        '/category': {
            pageData: {
                modelName: 'category',
                pageTitle: '分类',
                needBack: no,
                needMenu: no,
                linkReplace: yes,
                priority: 1
            },
            component: require('./components/pages/category.vue')
        },
        '/member': {
            pageData: {
                modelName: 'member',
                pageTitle: '成员',
                needBack: no,
                needMenu: no,
                linkReplace: yes,
                priority: 1
            },
            component: require('./components/pages/member.vue')
        },
        '/analysis': {
            pageData: {
                modelName: 'analysis',
                pageTitle: '分析',
                needBack: no,
                needMenu: no,
                linkReplace: yes,
                priority: 1
            },
            component: require('./components/pages/analysis.vue')
        },
        '/settings': {
            pageData: {
                modelName: 'settings',
                pageTitle: '设置',
                needBack: no,
                needMenu: no,
                linkReplace: yes,
                priority: 1
            },
            component: require('./components/pages/settings.vue')
        }
    });
}
