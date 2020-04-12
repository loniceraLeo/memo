<template>
  <div class="about">
    <div id="aboutpage" v-if="about">
      <div id="paper" @mouseenter="mouseenter" @mouseleave="mouseleave" :style="{width: getWidth + 'px'}">
        <img src="@/assets/tower.jpg">
        <h1 :style="{fontSize: '36px'}" id="header">About</h1>
        <hr :style="{width: '92%'}"/>
        <div><p v-html="this.marked(about.content)"></p></div>
      </div>
    </div>
    <div v-if="loading" style="text-align: center">Loading...</div>
  </div>
</template>

<script>
import anime from "animejs";
import marked from "marked";
import "@/style/markdown.css";

export default {
  props: {
    vis: {
      type: Boolean,
      default: true,
    }
  },
  data: function(){
     return {
        showOut: true,
        mypassage: {
          title: 'HELLO WORLD!',
          content: `This is the first passage of leo`
        },
        about: {
          author: 'Leo',
          content: this.marked(`>封面引用自pixiv id:7723538\r\n\r\n>Events是nodejs自定义的modules。所有nodejs异步事件都依赖EventEmitter。用EventEmitter类可以创建eventEmitter实例，实例上可以绑定事件处理程序和emit触发器\r\n\r\n>pixiv:1111\r\n\r\n ![jj](http://192.168.2.104:8080/images/default.jpg)\r\n\r\n233[链接](http://192.168.2.104:8080)233[???](http://192.168.2.104:8080/images/girl.jpg)\r\n\r\n看看\`let stack = [10000000]\`代码你就是哥脑瘫人，好兄弟，赶紧去你的雅座吃大粪,憋在这里污染空气嗷\r\r+ 嘿嘿\r+ 4444`),
        },
        loading: true
     }
  },
  computed: {
    getWidth: function(){
      return window.screen.width * .59;
    }
  },
  methods:{
    shout: function(){
      alert('END!!!');
    },
    fetchData(){        //ajax抓取数据
      let xhr = new XMLHttpRequest();
      xhr.open('GET', '/aboutInfo');
      xhr.setRequestHeader('Content-Type', 'text/plain');
      xhr.send();
      xhr.onload = () => {
        this.loading = false;
        this.about = JSON.parse(xhr.responseText)[0];
      }
    },
    mouseenter() {
      anime({
        targets: document.getElementById('paper'),
        translateY: -.5,
        duration: 100,
      });
    },
    mouseleave(){
      anime({
        targets: document.getElementById('paper'),
        translateY: .5,
        duration: 100
      })
    },
    marked
  },
  components: {
  },
  created(){
    this.fetchData();
    this.loading = false;
  }
}
</script>

<style scoped>
  .about {
    position: static;
    padding-top: 80px;
  }
  #paper {
    margin-bottom: 80px;
    transition: all 0.4s;
  }
  #paper:hover {          /*hover shadow */
    box-shadow: rgba(100, 100, 100, 0.3) 0px 0px 10px 3.3px;
  }
  #paper>p{
    padding-left: 30px;
  }
  #header {
    font-family: 'Times New Roman', Times, serif;
    letter-spacing: 3px;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  img {
    position: relative;
    margin: auto;
    width: 100%;
    height: 400px;
  }
  @keyframes masked{
    0%  {background-position: 0 0;} 
    100% {background-position: -100% 0;}
  }

  p {
    font-size: 18px;
    font-family: 楷体;
    font-weight: 550;
    line-height: 30px;
    margin: 0;
    padding-left: 28px;
    padding-right: 28px;
  }
  #paper {
    position: relative;
    margin: auto;
    margin-bottom: 50px;
   /* height: 1000px;*/
    min-width: 10%;
    background: rgba(245, 239, 239, 0.88);
    border: 1px solid #ccc;
  }
  h1 {
      text-align: center;
  }
</style>