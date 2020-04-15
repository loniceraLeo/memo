<template>
    <div id="navi-bar">
        <router-link 
        v-for="item in array" 
        :key="item.index" 
        :to="item.path" :class="['routerLink']">
            <div         
            :class="['bar' + item.index, 'bar']"
            :style="{top: 90 + item.index * 80 + 'px', background: `rgba(${random255()}, ${random255()}, ${random255()}, 0.93)`}"
            @mouseenter="mouseenter"
            @mouseleave="mouseleave"
            > <i :class="item.class" :style="{color: 'rgba(50, 59, 66, 0.99)'}"><span onselectstart="return false;">{{item.tag}}</span></i>
            </div>  
        </router-link>
    </div>
</template>

<script>
import anime from "animejs";
export default {
    data: function(){
        return {
            array: [
                {index: 1, path: '/', class: "fa fa-home fa-2x", tag: '首页'},
                {index: 2, path: '/archive', class: 'fa fa-archive fa-2x', tag: '归档'},
                {index: 3, path: '/note', class: 'fa fa-edit fa-2x', tag: '摘记'},
                {index: 4, path: '/comment', class: 'fa fa-comments fa-2x', tag: '留言' },
                {index: 5, path: '/friend', class: 'fa fa-handshake-o ', tag: '友链'},
                {index: 6, path: '/about', class: 'fa fa-at fa-2x', tag: '关于'}
            ],
        }
    },
    methods: {
        mouseenter(el) {
            el.target.style.filter = "brightness(100%)";
            anime({
                targets: el.target,
                translateX: 190,
                scale: 1.04,
                filter: 'brightness(110%)',
                easing: 'easeInOutCubic',
                duration: 200,
            }); 
        },
        mouseleave(el) {
            anime({
                targets: el.fromElement,
                translateX: 150,
                scale: 1,
                filter: 'brightness(100%)',
                easing: 'easeInOutCubic',
                duration: 200,
            })
        },
        random255() {
            return Math.round(190 + Math.random() * 65);
        }
    },
}
</script>

<style scoped>
    .bar {
        z-index: 100000;
        display: block;
        position: fixed;
        width: 230px;
        height: 55px;
        left: -200px;
       /* background: rgba(244, 244, 244, 0.76);*/
        border-top-right-radius: 27.5px;
        border-bottom-right-radius: 27.5px;

        box-shadow: rgba(100, 100, 100, 0.3) 0px 0px 4px 2px;
        transition: box-shadow .3s;

        -webkit-user-select: none;
    }
    a {
        float: left;
    }
    i {
        position: relative;
        top: 12px;
        left: 90px;
        font-size: 24px;
    }
    i span {
        position: relative;
        left: 10px;
        font-family: '楷体';
        font-weight: bolder;
    }
</style>