<template>
 <transition name="leaf" @before-enter="beforeenter" @enter="enter" @before-leave="beforeleave" @leave="leave" mode="out-in" appear>
   <!--<transition name="leaf" mode="out-in"> -->
    <slot/>
  </transition>
</template>

<script>
import anime from 'animejs';

export default {
  props: {
    dur: {
      type: Number,
      default: 1400
    }
  },
  methods: {
    beforeenter: function(el){
      el.style.opacity = 0;
      el.style.transform = "translateY(120px)";
    },
    enter: function(el, done){
      window.scrollTo({top: 0});
      anime({
        targets: el,
        opacity: {
          value: 1,
          easing: 'easeInOutElastic(.7, 2)'
        },
        translateY: {
          value: 0,
          easing: 'easeInOutElastic(.7, 2)'
        },
      /*  opacity: 1,
        translateY: 0,*/
        duration: 650,
        delay: 0,
        complete: function(){
          done();
        }
      });
    },
    leave: function(el, done){
      anime({
        targets: el,
        opacity: 0,
        translateY: 30,
        easing: 'easeInSine',
        duration: 240,
        complete: function(){
          done();
        }
      });
    }
  },
  computed: {
    /**
     * smooth transition between enter and leave
     */
  }
}
</script>

<style scoped>
</style>