<template>
  <div id="app" :draggable="false" @scroll="sc">
    <button class="hambuger" @mouseenter="hambugerenter" @mouseleave="hambugerleave" @click="hambugerclick"
      :class="['is-click']"><span id="col"></span></button>
    <img src="@/assets/shneshe.jpg" id='background' :style="{width: getwidth + 'px'}">
    <transition appear @before-enter="beforeenter" @enter="navienter" @leave="navileave">
      <navi v-if="navishow"></navi>
    </transition>
    <transition appear @enter="sideenter" @leave="sideleave">
      <!--<div  id="sidewrapper" v-if="navishow"></div>-->
    </transition>
    <transition name="top" @enter="topEnter" @leave="topLeave">
      <div id="jumptop" v-if="topshow">
        <i :class="['fa fa-rocket']" @click="jumpToTop"></i>
      </div>
    </transition>
    <jump>
      <router-view id="rv"></router-view>
    </jump>
    <my-footer />
  </div>
</template>

<script>
  import jump from "@/components/special/jptb.vue";
  import anime from "animejs";
  import navi from "@/components/elements/navigator.vue";
  import myFooter from "@/components/elements/footer.vue";
    //import sidebar from "@/components/elements/sidebar-home.vue";

  export default {
    data: function () {
      return {
        navishow: true,
        topshow: false,
        navistart: 200,
      }
    },
    components: {
      jump,
      navi,
      myFooter
      //sidebar
    },
    created() {
      window.addEventListener('scroll', this.sc);
      window.scrollTo(0, 0);
    },
    methods: {
      sc() {
        if (window.scrollY >= 400) this.topshow = true;
        else this.topshow = false;
      },
      topEnter(el, done) {
        anime({
          targets: el,
          translateY: -100,
          duration: 800,
          complete: done
        });
      },
      topLeave(el, done) {
        anime({
          targets: el,
          translateY: 0,
          duration: 800,
          complete: done
        })
      },
      enter(el, done) {
        anime({
          targets: el,
          duration: 400,
          opacity: .95,
          complete: done
        })
      },

      getScrollHeight() {
        console.log(document.body.scrollHeight)
        return document.body.scrollHeight;
      },

      navienter(el, done) {
        anime({
          targets: document.getElementsByClassName('bar'),
          translateX: 150,
          opacity: 1,
          duration: 500,
          delay:  anime.stagger(100, {start: this.navistart}),
          complete: () => {
            done();
            this.navistart = 0;
          },
        })
      },
      navileave(el, done) {
        anime({
          targets: document.getElementsByClassName('bar'),
          translateX: -150,
          opacity: 0,
          duration: 1000,
          complete: done,
        })
      },
      sideenter(el, done) {
        anime({
          targets: el,
          translateX: 150,
          boxShadow: '0px 0px 20px 10px rgba(96, 192, 255, .2) inset, 0px 0px 20px 10px rgba(96, 192, 255, .2)',
          duration: 100,
          easing: 'linear',
          complete: done,
        })
      },
      hambugerenter() {
        document.getElementsByClassName('hambuger')[0].classList.add('is-active');
      },
      hambugerleave() {
        document.getElementsByClassName('hambuger')[0].classList.remove('is-active');
      },
      hambugerclick() {
        document.getElementsByClassName('hambuger')[0].classList.toggle('is-click');
        this.navishow = !this.navishow;
      },
      jumpToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    },
    computed: {
      getwidth: function () {
        return window.screen.width;
      },
    },
  }
</script>

<style>
  #rv {
    position: relative;
    min-width: 400px;
    min-height: 650px;
    margin-bottom: 30px;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #nav>a {
    text-decoration: none;
    transition: color .6s;
    font-family: 楷体;
    font-size: 24px;
  }

  #jumptop {
    position: fixed;
    right: 220px;
    bottom: -80px;
    font-size: 70px;
    width: 80px;
    overflow: hidden;
    ;
    height: 80px;
    z-index: 10000;
    color: #fca;
    border-radius: 50%;
    background: rgba(255, 255, 255, .6);

  }

  #jumptop:hover {
    cursor: pointer;
  }

  #jumptop i {
    position: relative;
    left: 10px;
  }

  #sidewrapper {
    position: fixed;
    top: 0px;
    left: -180px;
    width: 17%;
    height: 100%;

    background: rgba(255, 255, 255, .3);
    filter: brightness(150%);
  }

  @keyframes masked {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: -100% 0;
    }
  }

  /*#footer {
  position: static;
  width: 100%;
  height: 22px;
  margin-top: 200px;
  z-index: 10000;


  letter-spacing: 3px;
  font-size: 20px;
  color: #acf;
  text-align: center;
}*/
  #nav>a:hover {
    color: #cfa;
  }

  body {
    overflow: scroll;
    margin: 0px;
    background-size: cover;
  }

  #navigator {
    position: fixed;
    top: 120px;
    right: -150px;
    width: 200px;
    height: 500px;
    z-index: 100000;
    background: rgba(255, 255, 255, 0.55);
    border-top-left-radius: 30px;
  }

  #githubRef {
    display: block;
    position: fixed;
    width: 60px;
    bottom: 20px;
    right: 20px;
    transition: all 0.8s;
  }

  #nav {
    position: absolute;
    width: 50%;
    font-family: Roman;
    left: 600px;
    margin: auto;
  }

  #navwarpper {
    position: static;
    width: 100%;
    height: 100px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
    text-decoration: none;
  }

  #background {
    z-index: -100;
    position: fixed;
    height: 100%;
    min-width: 101%;
    opacity: 0.80;
    -webkit-user-select: none;
  }
</style>