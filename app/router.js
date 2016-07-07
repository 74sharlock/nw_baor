const yes = true;
const no = false;

export default function (router) {
    router.map({
        '/': {
            pageData: {
                modelName: 'home',
                pageTitle: '首页',
                needBack: no,
                needMenu: no,
                linkReplace: yes,
                priority: 0
            },
            component: require('./pages/index.vue')
        },
        '/category': {
            pageData: {
                modelName: 'category',
                pageTitle: '分类',
                needBack: no,
                needMenu: no,
                linkReplace: yes,
                priority: 0
            },
            component: require('./pages/category.vue')
        },
        '/member': {
            pageData: {
                modelName: 'member',
                pageTitle: '成员',
                needBack: no,
                needMenu: no,
                linkReplace: yes,
                priority: 0
            },
            component: require('./pages/member.vue')
        },
        '/analysis': {
            pageData: {
                modelName: 'analysis',
                pageTitle: '分析',
                needBack: no,
                needMenu: no,
                linkReplace: yes,
                priority: 0
            },
            component: require('./pages/analysis.vue')
        },
        '/settings': {
            pageData: {
                modelName: 'settings',
                pageTitle: '设置',
                needBack: no,
                needMenu: no,
                linkReplace: yes,
                priority: 0
            },
            component: require('./pages/settings.vue')
        }
    });
}
