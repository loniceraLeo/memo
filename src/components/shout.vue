<template>
<div>
    <button @click="truthness = !truthness">Click Me?</button>
    <transition name="anime">
    <div v-if="truthness">
      <h1 @mouseenter="backgroundChange" @mouseleave="resume" :style="pStyle">{{ someText }}</h1>
      <p>The passage is written by Leo Ma.</p>
      <p >I am searching for more delicate life...</p>
      <input type="text" v-model="someText">
    </div>
    </transition>
</div>
</template>

<script>
import "animate.css";
export default {
    data: function() {
        return {
            someText: '马雁南',
            truthness: false,
            pStyle: {
                background: 'none',
            }
        }
    },
    methods: {
        backgroundChange: function(){
            this.pStyle = {background: "rgba(255, 160, 190, 0.6)"}
        },
        resume: function(){
            this.pStyle = {background: 'none'}
        }
    }
}
</script>

<style scoped>
    h1 {
        color: red;
        font-family: 华文隶书;
        transition: all 0.5s;
    }
    p {
        font-family: 华文隶书,Ink Free;
        font-weight: bolder;
        font-size: 30px;
    }
    .anime-enter, .anime-leave-to {
        opacity: 0;
    }
    .anime-enter-active  {
        transition: all 1s;
        animation: zoomInLeft 1s;
    }
    .anime-leave-active {
        transition: all 1s;
        animation: zoomOutRight 1s;
    }
    input {
        outline: none;
        background: rgba(230, 120, 60, 0.5);
        border: 2px solid #fac;
    }
</style>