<template>
  <div id="sidebar-home">
      <div class="paper"></div>
            <div id='avatar'><img src="@/assets/avatar.png"></div>
            <div id="quotoinfo">
                <p>本页面引用:</p>
                <hr>
                <p v-for="item in quotos" :key="item">pid: {{item}}</p>
            </div>
  </div>
</template>

<script>
import anime from "animejs";
export default {
    data: function(){
        return {
            quotos: [
                '71187441', 
                '80188308',
                '80315592',
                '64952228',
            ]
        }
    },
    methods: {
        mouseenter(event) {
            console.log('22');
            anime({
                targets: event.target,
                rotate: 360,
                duration: 300,
            })
        }
    }
}
</script>

<style scoped>
.paper {
    display:block;
    position: fixed;
    width: 230px;
    height: 100%;
    right: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.2);
}
#user-id {
    z-index: 100000;
    position: fixed;
    height: 40px;
    right: 100px;
    top: 240px;
    background: rgba(255, 255, 255, 0.5);
}
#quotoinfo {
    z-index: 100000;
    position: fixed;
    width: 180px;

    right: 25px;
    bottom: 250px;
    background: rgba(255, 255, 255, .45);
    overflow:hidden;
}
#quotoinfo p {
    margin-left: 20px;
    font-weight: bolder;
    font-family: 宋体;
}
#avatar{
    z-index: 1000000;
    position: fixed;
    width: 160px;
    height: 160px;
    top: 30px;
    right: 33px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: rgba(100, 100, 100, 0.9) 0px 0px 10px 3.3px;
    overflow: hidden;

    transition: all .5s;
}
#avatar:hover{
    transform: scale(1.08);
    box-shadow: 0px 0px 8px 6px rgba(255, 255, 255, .5);
}
</style>