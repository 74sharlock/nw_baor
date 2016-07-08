import electron from 'electron'

const workPath = process.cwd();
const appPath = `${workPath}/app`;
const dataPath = `${workPath}/data`;

export default {
    install(vue){
        Object.keys(electron).forEach(function (key) {
            vue.prototype[`$${key}`] = electron[key];
        });
        
        vue.prototype.$Path = {
            workPath,
            appPath,
            dataPath
        }
    }
}