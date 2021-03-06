import electron from 'electron'

const workPath = process.cwd();
const appPath = `${workPath}/app`;
const dataPath = `${workPath}/data`;
const avatarPath = `${appPath}/avatar`;

export default {
    install(vue){
        Object.keys(electron).forEach(function (key) {
            vue.prototype[`$${key}`] = electron[key];
        });
        
        vue.prototype.$Path = {
            workPath,
            appPath,
            dataPath,
            avatarPath
        };
        
        vue.prototype.$avatar = function (val) {
            return require(`avatar/${val}`);
        };

        vue.prototype.$dialog = electron.remote.dialog;
        vue.prototype.$dialog.show = vue.prototype.$dialog.showMessageBox;
    }
}