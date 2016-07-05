const yes = true;
const no = false;

export default function (router) {
    router.map({
        '/': {
            pageData: {
                modelName: 'home',
                pageTitle: '主界面',
                needBack: no,
                needMenu: no,
                needFooter: yes,
                linkReplace: yes,
                priority: 0
            },
            component: require('./pages/index.vue')
        }
    });
}
