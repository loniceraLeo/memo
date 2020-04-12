<template>
  <div class="home">
    <div class="outerwrapper">
      <div id="headwrapper">
        <h1 id="hw"><span id="header">{{header}}</span></h1>
        <p id="subheader">{{subheader}}</p>
      </div>
      <jump>
        <div id="page" v-if="posts">
          <div v-for="(item, index) in posts" :key="index" :class="['box', 'box' + index]">
            <div :class="['card', 'card' + index]" v-if="item">
              <div :class="['wrapper', 'wrapper' + index]">
                <div :class="['innerwrapper', 'innerwrapper' + index]" @mouseenter="wrappermouseenter"
                  @mouseleave="wrappermouseleave">
                  <img :class="['iw', 'iw' + index]" :src='item.coverimage' @click="gotoPost(item)">
                  <!--<transition name="infoBox" @before-enter="beforeenter">-->
                  <div :class="['info', 'info' + index]">
                    <p :class="['title', 'title' + index]">{{posts[index].title}}</p>
                  </div>
                  <!-- </transition>--->
                </div>
              </div>
              <div :class="['intro', 'intro' + index]">
                <p>intro: <br />{{getShort(item)}}<i class="fa fa-pencil"></i></p>
                <hr>
                <i class="fa fa-calendar"></i>
                <p>
                  <!--{{item.posttime.year}}-{{item.posttime.month}}-{{item.posttime.day}}-->2020-3-30</p>
              </div>
            </div>
          </div>
          <div id="skip">
            <div id="front" @click="jumptonextpage" :style="{cursor: 'pointer'}" @mouseenter="jumpenter"
              @mouseleave="jumpleave" v-if="!lastpassage"><i :class="['fa fa-arrow-right fa-4x']"></i>
            </div>
            <div id="back" @click="jumpbackpage" :style="{cursor: 'pointer'}" @mouseenter="backenter"
              @mouseleave="backleave" v-if="headindex.length > 2"><i :class="['fa fa-arrow-left fa-4x']"></i>
            </div>
          </div>
        </div>
      </jump>
      <div v-if="loading" id="loading"><img src="@/assets/loading-svg/loading-balls.svg"
          alt="Loading icon"></div><!-- loading image-->
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import anime from "animejs";
  import jump from "@/components/special/jptb.vue";
  export default {
    name: 'Home',
    data: function () {
      return {
        infoShow: {
          '0': false,
          '1': false,
          '2': false,
          '3': false,
          '4': false,
        },
        headindex: [100000000],
        lastpassage: false,
        posts: '',
        /*posts: [{
            title: '嘿嘿嘿',
            id: 1,
            coverimage: '@/assets/maincover1.png',
            year: 2020,
            month: 3,
            day: 29,
            content: '# 嘿嘿嘿\n>Vue\n二元函数可以推广到更高阶的函数,本质上就是两个因变量。本文将提示开发博客主题的几个要点边界上的点必然不是内点。区域的充要条件是联通，包含边界的是闭区域，不包含的是开区域.'
          },
          {
            title: 'Hello world',
            coverimage: '@/assets/maincover1.png'
          },
          {
            title: '前端入门萌新级指导',
            coverimage: '@/assets/maincover1.png'
          },
          {
            title: 'test',
            coverimage: '@/assets/maincover1.png'
          },
          {
            title: 'abcdde',
            coverimage: '@/assets/maincover1.png'
          }
        ],*/
        loading: true,
        header: 'Lonicera',
        subheader: '个人向博客 :)'
      }
    },
    computed: {},
    components: {
      jump,
    },
    watch: {
      '$route': 'fetchData'
    },
    created() { //create hook
      setTimeout(() => {
        this.fetchData();
        document.title = 'lonicera :)'
        window.scrollTo(0, 0);
      }, 800)
    },
    methods: {
      gotoPost(item) {
        this.$router.push({
          path: `/post/${item.id}`
        })
      },
      stackTop(arr) {
        /**维护一个栈记录页面首索引 */
        let length = arr.length - 1;
        return arr[length];
      },
      getShort(obj) {
        /**获取首页Intro */
        let content = obj.content ? obj.content : '';
        content = content.split(/\n\r/g).filter(item => {
          return item != ''
        })[2];
        content = content ? content : '这个世界的真理,到底是什么呢';
        content = content.slice(0, 56) + (content.length > 56 ? '...' : '');
        return content;
      },
      jumptonextpage() {
        this.posts = '';
        this.loading = true;
        setTimeout(() => {
          window.scrollTo(0, 0);
          this.fetchData();
        }, 500);
      },
      jumpbackpage() {
        this.posts = '';
        this.loading = true;
        //弹出栈顶
        this.headindex.pop();
        this.headindex.pop();
        setTimeout(() => {
          window.scrollTo(0, 0);
          this.fetchData();
        }, 500);
      },
      jumpenter(e) {
        anime({
          targets: e.target,
          translateX: 20,
        })
      },
      jumpleave(e) {
        anime({
          targets: e.target,
          translateX: 0,
        })
      },
      backenter(e) {
        anime({
          targets: e.target,
          translateX: -20,
        })
      },
      backleave(e) {
        anime({
          targets: e.target,
          translateX: 0,
        })
      },
      alterShow() {
        if (window.event.target.constructor.name.match(/Image/g)) {
          console.log(window.event.target.constructor.name);
          this.infoShow = !this.infoShow;
        }
      },
      beforeenter(el) {
        el.style.opacity = 0;
        el.style.transform = 'translateY(120px)';
      },
      enter(el, done) {
        anime({
          targets: el,
          translateY: -80,
          duration: 388,
          opacity: 1,
          easing: 'easeInOutCubic',
          complete: done
        })
      },
      leave(el, done) {
        anime({
          targets: el,
          translateY: -50,
          duration: 388,
          opacity: 0,
          easing: 'easeInOutCubic',
          complete: done
        })
      },
      wrappermouseenter(e) {
        let index = e.target.classList[1].length - 1;
        this.infoShow[e.target.classList[1][index]] = true;
        anime({
          targets: e.target.firstChild,
          scale: 1.08,
          duration: 20,
        });
      },
      wrappermouseleave(e) {
        let index = e.target.classList[1].length - 1;
        this.infoShow[e.target.classList[1][index]] = false;
        anime({
          targets: e.target.firstChild,
          scale: 1,
          duration: 80,
        })
      },
      fetchData() {
        /**栈顶记录跳转游标*/
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/postinfo/${this.stackTop(this.headindex)}`);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.send();
        xhr.onload = () => {
          this.loading = false;
          this.posts = JSON.parse(xhr.responseText);
          this.headindex.push(this.posts[this.posts.length - 1].id - 1); //栈顶保存下次跳转的首索引
          this.lastpassage = this.posts.some(item => item.id === 1); //若当前视图包含第一篇文章，隐藏前进图标
          this.posts.forEach(item => {
            item.posttime = JSON.parse(item.posttime)
          });
        }
      }
    },
  }
</script>

<style>
  h1 {
    margin: 10px
  }
</style>
<style scoped>
  .home {
    position: static;
  }

  h1 {
    margin: 0px;
  }

  #headwrapper {
    position: relative;
    width: 100%;
    height: 300px;
  }

  #hw {
    position: relative;
    top: 30px;
    margin: auto;

    line-height: 70px;
    font-size: 68px;
    font-family: '宋体', 'Times New Roman', Times, serif;
    font-weight: bolder;
    letter-spacing: 8px;
    /*background: linear-gradient(to right, #fac 0%, #acf 25%, #fac 50%, #acf 75%, #fac);
    background-clip: text;
    color: transparent;
    background-size: 200% 100%;*/
    color: rgb(60, 20, 0);
    text-align: center;

    transition: all 0.3s;
    animation: masked 2s infinite linear;
  }

  #header {
    display: inline;
    position: relative;
    /**重要！ */
    top: 20px;
  }

  #header:hover {
    cursor: default;
    transform: translate3d(10, 10);
  }

  #header::before {
    content: '';
    position: absolute;
    top: 100%;
    height: 2px;
    width: 0%;
    right: 50%;
    background: #fca;
    transition: all .5s;
  }

  #header:hover::before {
    width: 50%;
  }

  #header::after {
    content: '';
    position: absolute;
    top: 100%;
    height: 2px;
    width: 0%;
    left: 50%;
    background: #fca;
    transition: all .5s;
  }

  #header:hover::after {
    width: 50%;
  }

  #subheader {
    position: relative;
    top: 70px;
    color: rgba(60, 80, 50);
    margin: auto;
    font-weight: bolder;
    text-align: center;
  }

  #tip {
    position: relative;
    top: 180px;
    width: 300px;
    background: rgba(255, 255, 255, .4);
    margin: auto;
    text-align: center;
  }

  #tip span {
    position: relative;
    margin: auto;
  }

  .card0 {
    -webkit-box-reflect: above 0px -webkit-gradient(linear, 0px, 10px, from(transparent), to(rgba(250, 250, 250, 0.8)));
  }

  div.info {
    position: relative;
    z-index: 1000;
    width: 460px;
    height: 80px;
    /*top: 360px;*/
    bottom: 70px;
    left: 0px;
    padding: 0;
    background: rgba(255, 255, 255, .67);
    box-shadow: .5px .5px .5px #fac, -.5px -.5px .5px #acf;

    -webkit-user-select: none;
    -moz-user-select: none;
  }

  .title {
    position: relative;
    font-size: 22px;
    letter-spacing: 1.1px;
    font-weight: bolder;
    color: rgba(40, 40, 40, 1);
    filter: brightness(150%);
    left: 20px;
    top: 12px;
    font-family: 'Times New Roman', Times, serif;
  }

  #pixinfo {
    position: absolute;
    font-size: 36px;
    color: #67a;
    left: 100px;
    top: 0px;
  }

  #skip {
    position: static;
    margin-top: 80px;
    margin-bottom: 0px;
    height: 100px;
  }

  #front {
    position: absolute;
    width: 80px;
    height: 80px;

    bottom: 40px;
    left: 52%;
    border-radius: 50%;
  }

  #back {
    position: absolute;
    width: 80px;
    height: 80px;

    bottom: 40px;
    left: 44%;
    border-radius: 50%;
  }

  #front i {
    position: relative;
    left: 15px;
    top: 8px;

    color: rgba(160, 192, 155);
  }

  #back i {
    position: relative;
    left: 12px;
    top: 8px;

    color: rgba(155, 160, 255);
  }

  #latest {
    position: relative;
    top: 100px;
    text-align: center;

    font-size: 28px;
    font-family: 'Times New Roman', Times, serif;
    font-weight: bolder;
  }

  #latest div {
    position: relative;
    margin: auto;
    width: 330px;
    height: 40px;
    line-height: 40px;
    letter-spacing: 1px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
    transition: all 0.4s;
  }

  @keyframes masked {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: -100% 0;
    }
  }

  img.iw {
    width: 450px;
    height: 260px;
    transition: transform 0.4s;

    -webkit-user-select: none;
    -moz-user-select: none;
  }

  div.innerwrapper {
    position: relative;
    background: url('../assets/girl.jpg');
    /* transition: transform 0.8s;*/
  }

  .box {
    position: static;
  }

  .card {
    position: relative;
    margin: auto;
    width: 600px;
    left: 80px;
  }

  .intro {
    position: absolute;
    z-index: -1000000;
    top: 2.5px;
    left: 55%;
    width: 200px;
    height: 260px;
    font-family: '仿宋', 'Times New Roman', Times, serif;
    font-weight: bolder;

    background: rgba(255, 255, 255, 0.85);
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;

    box-shadow: 0px 0px 8px 2px rgba(100, 100, 100, 0.3), 0px 0px 4px 1px rgba(100, 100, 100, 0.3) inset;
  }

  .intro i {
    position: static;
    font-weight: 100;
    font-size: 14px;
    color: rgba(100, 100, 100, 0.8);
  }

  .intro p {
    position: relative;
    left: 40px;
    top: -6px;
    width: 150px;
    height: 180px;
    font-size: 16px;
    font-weight: 520;

    letter-spacing: 1.2px;
    line-height: 22px;

    text-indent: 10px;
  }

  .intro :nth-child(3) {
    position: relative;
    float: left;
    left: 43px;
    top: 2px;
    font-size: 20px;
  }

  .intro :nth-child(4) {
    position: relative;
    font-size: 18px;
    font-weight: bolder;
    margin: 16px 0 0 20px;
  }

  .wrapper {
    position: relative;
    width: 400px;
    height: 260px;
    left: -50px;
    margin-bottom: 35px;
    /* box-shadow: 4px 4px 4px #fac, -4px -4px 4px #acf;   */
    background: linear-gradient(to right, #f6c 0%, #4cf 12.5%, #6fc 25%, #cf5 37.5%, #f6c 50%, #4cf 62.5%, #6fc 75%, #cf5 87.5%, #f6c);
    background-clip: border-box;
    background-size: 200% 100%;

    border-bottom: 1.5px solid transparent;
    border-top: 2px solid transparent;
    border-left: none;
    border-right: none;
    box-shadow: 3px 0px 2px 1px #acf, -2px 0px 1.5px 1px #acf;
    overflow: hidden;

    animation: masked 2s infinite linear;
    animation-play-state: paused;

    transition: all .5s;
  }

  .wrapper:hover {
    cursor: pointer;

    animation-play-state: running;
  }

  div.outerwrapper {
    width: 100%;
    margin: auto;
  }
</style>