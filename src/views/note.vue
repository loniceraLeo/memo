<template>
    <div class="note">
        <jptb>
            <div id="wraper" v-if="notes">
                <div v-for="(item, index) in notes" :key="index" :class="['paper', 'paper' + index]">
                    <div class="uptime"
                        :style="{background: `rgba(${random255()}, ${random255()}, ${random255()}, .95)`}">
                        <div :class="['light']" id="light0"
                            :style="{background: `rgba(${random255Low()}, ${random255Low()}, ${random255Low()}, .44)`}"
                            @click="drag">
                            <i :class="['fa', 'fa-caret-down', 'caret' + index]"></i>
                        </div>
                        <div :class="['light']" id="light1"
                            :style="{background: `rgba(${random255Low()}, ${random255Low()}, ${random255Low()}, .44)`}"
                            @click="alignCenter">
                            <i :class="['fa', 'fa-align-center', 'align' + index]"></i>
                        </div>
                        <i :class="['fa', 'fa-clock-o']"></i>
                        <span>{{item.posttime.year}}年{{item.posttime.month}}月{{item.posttime.day}}日</span>
                    </div>
                    <div :class="['content', 'content' + index, 'center']">
                        <div :class="['title', 'title' + index]">
                            <span>{{item.title}}</span>
                        </div>
                        <p v-html="marked(item.content)"></p>
                    </div>
                </div>
            </div>
        </jptb>
        <div v-if="loading" id="loading">
            <img src="@/assets/loading-svg/loading-balls.svg" alt="Loading icon">
        </div>
    </div>
</template>

<script>
    import Velocity from "velocity-animate";
    import anime from "animejs";
    import marked from "marked";
    export default {
        data: function () {
            return {
                notes: '',
                /*notes: [{
                    title: '「千之刃涛,桃花染之皇姬」fd歌词',
                    content: '翩翩起舞的桃花雪 此世间乃愉悦的桃幻浪漫翩翩起舞的桃花雪 此世间乃愉悦的桃幻浪漫,真是太好了',
                    posttime: {
                        year: 2020,
                        month: 4,
                        day: 7
                    }
                }],*/
                loading: true
            }
        },
        created() {
            this.fetchData();
            document.title = 'note';
        },
        methods: {
            marked,
            Velocity,
            anime,
            getLastElment(tar) {
                let length = tar.length;
                return tar[length - 1];
            },
            drag(e) {
                let n = e.target.classList[2][5];
                let el = document.querySelectorAll('.content' + n)[0];
                e.target.classList.toggle('turn');
                anime({
                    targets: el,
                    easing: 'easeInOutCubic',
                    duration: 300,
                    height: el.clientHeight === 40 ? el.scrollHeight + 10 : 40
                })
            },
            alignCenter(e) {
                let n = parseInt(this.getLastElment(e.target.parentNode.parentNode.parentNode.classList[1]));
                e.target.classList.toggle('fa-align-left');
                e.target.classList.toggle('fa-align-center');
                document.querySelectorAll('.content')[n].classList.toggle('center');
            },
            random255() {
                return Math.round(190 + Math.random() * 65);
            },
            random255Low() {
                return Math.round(120 + Math.random() * 65);
            },
            fetchData() {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', '/noteinfo');
                xhr.setRequestHeader('content-Type', 'text/plain');
                xhr.send();
                xhr.onload = () => {
                    this.loading = false;
                    this.notes = JSON.parse(xhr.responseText);
                    this.notes.forEach(item => {
                        item.posttime = JSON.parse(item.posttime);
                    });
                    this.notes = this.notes.reverse();
                }
            }
        }
    }
</script>

<style scoped>
    .note {
        position: static;
        padding-top: 80px;
    }

    .paper {
        position: static;
        width: 680px;
        /**min-width: 200px*/
        margin: auto;
        margin-bottom: 10px;
        overflow: hidden;
        transition: all .5s;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .uptime {
        position: relative;
        width: 100%;
        height: 40px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }

    .uptime i {
        margin-left: 40%;
        margin-top: 10px;
    }

    .uptime span {
        position: relative;
        left: 15px;
    }

    .light {
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        left: 10px;
        top: 5px;

        transition: all .5s;
    }

    .light:hover {
        box-shadow: 0px 0px 4px 2px rgba(255, 255, 255, .55) inset, 0px 0px 4px 2px rgba(255, 255, 255, .55);
    }

    .light i {
        font-size: 24px;
        position: absolute;
        padding-left: 8.5px;
        padding-top: 4px;
        margin: 0px;
        width: 100%;
        height: 100%;
        color: #fff;

        transition: all .3s;
    }

    #light0 i.turn {
        transform: rotate(180deg) translateY(2px) translateX(8px);
    }

    #light1 {
        left: 45px;
    }

    #light1 i {
        padding-left: 6px;
        padding-top: 6px;
        font-size: 18px;
    }

    .content {
        position: relative;
        height: 40px;
        padding-left: 15px;
        padding-right: 15px;
        background: rgba(255, 255, 255, .88);
        text-align: left;
    }

    .content.full {
        max-height: 300px;
        max-height: min-content;
    }

    .content span {
        text-align: center;
        line-height: 40px;
    }

    .title {
        text-align: center;
    }

    .content p {
        margin: 0px;
        margin-top: 6px;
        margin-bottom: 6px;
        letter-spacing: .3px;
        line-height: 26px;
        font-weight: 550;
    }

    .content.center {
        text-align: center;
    }
</style>