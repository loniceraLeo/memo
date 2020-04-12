<template>
    <div class="archive">
        <div id="wrapper" v-if="archive">
            <div id="paper" :style="{width: getWidth + 'px'}">
                <h1><i :class="['fa', 'fa-bullhorn']" :style="{marginRight: '30px'}"></i>总计{{archive.length}}篇博文 :)
                </h1>
                <div id="illus"><img src="http://192.168.2.104:8080/images/congyu.png" ondragstart="return false;"></div>
                <div id="main">
                    <i :class="['fa', 'fa-caret-right', 'caret']" v-if="caretShow"></i>
                    <div v-for="(item, index) in time" :key="index">
                        <h2>{{item[0].year}}年{{item[0].month}}月</h2>
                        <hr/>
                        <p v-for="(el, i) in item" :key="i" class="container" @mouseenter="mouseenter"><a @click="gotoPost(el)" :class="['link', 'link' + i]">{{el.title}}</a></p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="loading" id="loading"><img src="http://192.168.2.104:8080/user-assets/loading-svg/loading-balls.svg"
                alt="Loading icon"></div><!-- loading image-->
    </div>
</template>

<script>
    import anime from "animejs";
    export default {
        created() {
            this.fetchData();
            document.title = 'Archive'
        },
        data: function () {
            return {
                loading: true,
                archive: [{
                    id: 1,
                    title: 'thank you',
                    year: 2020,
                    month: 4
                }],
                time: {
                    '2020-4': [{
                        id: 1,
                        title: 'thank you',
                        year: 2020,
                        month: 4
                    }, {
                        id: 2,
                        title: 'lonicera',
                        year: 2020,
                        month: 4
                    }]
                },
                caretShow: true,
            }
        },
        methods: {
            mouseenter(e, done) {
                anime({
                    targets: document.querySelectorAll('.caret'),
                    translateY: `${e.target.offsetTop}`,
                    duration: 220,
                    easing: 'easeInOutCubic',
                    complete: done
                })
            },
            gotoPost(el) {
                this.$router.push({
                    path: `/post/${el.id}`
                })
            },
            fetchData() {
                let month = [];
                let xhr = new XMLHttpRequest();
                xhr.open('GET', '/archiveinfo');
                xhr.setRequestHeader('content-Type', 'text/plain'); //ignored..
                xhr.send();
                xhr.onload = () => {
                    this.loading = false;
                    this.archive = JSON.parse(xhr.responseText);
                    this.archive.forEach(item => {
                        let temp = JSON.parse(item.posttime);
                        month.unshift({
                            id: item.id,
                            title: item.title,
                            year: temp.year,
                            month: temp.month
                        });
                    });
                    month.forEach(item => {
                        let timeMark = item.year + '-' + item.month;
                        if (!(timeMark in this.time)) {
                            this.time[timeMark] = [];
                            this.time[timeMark].push(item);
                        } else {
                            this.time[timeMark].push(item);
                        }
                    });
                }
            }
        },
        computed: {
            getWidth() {
                return window.screen.width * .59;
            }
        }
    }
</script>

<style scoped>
    h1 {
        position: relative;
        top: 30px;
        font-family: '楷体';
        color: rgb(70, 70, 20);
        font-size: 24px;
        height: 100px;
    }

    h2 {
        position: relative;
        left: 50px;
    }
    .box {
        position: relative;
    }
    .box::after {
        content: '';
        position: absolute;
        left: 0px;
        top: 0px;
        width: 10px;
        height: 100%;
        background: #acf;
    }
    .container {
        position: relative;
        margin-top: 15px;
        margin-bottom: 15px;
        height: 23px;
        left: 90px;
    }

    .link:hover {
        cursor: pointer;
    }

    .link {
        position: relative;
        font-weight: bold;
        color: rgb(40, 60, 30);
    }
    #main {
        position: relative;
    }
    .caret {
        position: absolute;
        color: #fac;
        font-size: 25px;
        left: 20px;
    }

    #illus {
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 200px;
        height: 220px;
        -webkit-user-select: none;
        -moz-user-select: none;
    }

    #illus img {
        z-index: 1000000;
        width: 200px;
        height: 220px;
        position: relative;
        box-shadow: none;
        opacity: .9;
        -webkit-user-select: none;
        -moz-user-select: none;
    }

    .archive {
        position: static;
        padding-top: 80px;
    }

    #paper {
        position: relative;
        margin: auto;
        overflow: hidden;
        min-height: 500px;
        background: rgba(255, 255, 255, .88);
        transition: all .3s;
        margin-bottom: 0px;
    }
</style>