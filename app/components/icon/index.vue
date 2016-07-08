<template>
    <i class="fa" :class="className" :style="{fontSize: !!size ? size + 'px' : ''}"></i>
</template>

<script type="text/babel">
    export default {
        props: ['name', 'type', 'size'],
        data () {
            return {

            }
        },
        computed: {
            className(){
                let className = '';
                if(!!this.name){
                    className += ` fa-${this.name}`;
                }
                if(!!this.type){
                    className += ` fa-${this.type}`;
                }
                return className;
            }
        }
    }
</script>