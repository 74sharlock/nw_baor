import electron from 'electron'

export default {
    install(vue){
        vue.prototype.$electron = electron;
    }
}