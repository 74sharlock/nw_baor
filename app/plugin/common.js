export default {
    install(vue){
        vue.prototype.$getType = (everything) => ({}).toString.call(everything).replace(/\[object\s(.*)\]/,'$1').toLowerCase();
        
        vue.prototype.$abs = (num) => Math.abs(Number(num));
        
        vue.prototype.$getTotal = function (arr, key) {
            if(arr && arr.length){
                console.log(this.$getType(key));
                return arr.reduce((x, y) => {
                    if(this.$getType(key) === 'string'){
                        return (Number(x[key]) || Number(x)) + Number(y[key]);
                    }
                    return Number(x) + Number(y);
                });
            }
            return 0
        };
    }    
};