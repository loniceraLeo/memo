<template>
    <div class="post">
        <jptb>
            <div id="postpage" v-if="post">
                <div id="paper" :style="{width: getWidth + 'px'}">
                    <div id="wrapper">
                        <img :src="post.coverimage" id='cover'>
                    </div>
                    <div id="passage">
                        <h1 id="header">{{post.title}}</h1>
                        <p :style="{textAlign: 'center', fontSize: '15px'}"><i :class="['fa', 'fa-pencil']"
                                :style="{marginRight: '6px'}"></i>{{post.posttime.year}}年{{post.posttime.month}}月{{post.posttime.day}}日
                        </p>
                        <hr :style="{width: '92%'}" />
                        <p v-html="marked(passageify(post))"></p>
                    </div>
                </div>
            </div>
        </jptb>
        <div v-if="loading" id="loading"><img src="@/assets/loading-svg/loading-balls.svg" alt="Loading icon"></div>
    </div>
</template>

<script>
    import "@/style/markdown.css";
    import marked from "marked";
    export default {
        data: function () {
            return {
                post: '',
                /*post: {
                    coverimage: 'http://192.168.2.104:8080/images/post/scape2.jpg',
                    title: '嘿嘿嘿',
                    posttime: {
                        year: 2020,
                        month: 4,
                        day: 1,
                    },
                    content: `# 嘿嘿嘿\n>VUE\n\n二元函数可以推广到更高阶的函数,本质上就是两个因变量。本文将提示开发博客主题的几个要点边界上的点必然不是内点。区域的充要条件是联通，包含边界的是闭区域，不包含的是开区域.`
                },*/
                loading: true,
            }
        },
        computed: {
            getWidth() {
                return window.screen.width * .59;
            }
        },
        methods: {
            marked,
            passageify(o) {
                let headerLength = o.title.length;
                let content = o.content.slice(headerLength + 2);
                return content;
            },
            fetchData() {
                let gid = this.$route.params.id;
                let xhr = new XMLHttpRequest();
                xhr.open('GET', `/postid/${gid}`);
                xhr.setRequestHeader('Content-Type', 'text/plain');
                xhr.send();
                xhr.onload = () => {
                    this.loading = false;
                    this.post = JSON.parse(xhr.responseText)[0];
                    this.post.posttime = JSON.parse(this.post.posttime);
                    document.title = this.post.title;
                }
            },
        },
        created() {
            setTimeout(() => {
                this.fetchData();
            }, 400); 
        }
    }
</script>

<style scoped>
    .post {
        position: static;
        padding-top: 80px;
    }

    #paper {
        position: relative;
        margin: auto;

        min-width: 500px;
        background: rgba(255, 255, 255, 0.88);
        border: 1px solid #ccc;
        margin-bottom: 80px;
        overflow: hidden;
        border-radius: 20px;

        transition: all 0.4s;
    }

    /*#paper:hover {
        box-shadow: rgba(100, 100, 100, 0.3) 0px 0px 10px 3.3px;
        transform: translateY(-.3px);
    }*/

    #passage {
        padding: 0px;
    }

    #cover {
        position: relative;
        margin: auto;
        width: 100%;
        height: 520px;
        top: -80px;
    }

    #wrapper {
        width: 100%;
        height: 400px;
        overflow: hidden;
    }

    #header {
        font-family: 'Times New Roman', Times, serif;
        letter-spacing: 1px;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    p {
        font-size: 17px;
        font-family: '宋体';
        font-weight: 550;
        letter-spacing: .4px;
        line-height: 30px;
        margin: 0;
        padding-left: 28px;
        padding-right: 28px;
    }
</style>