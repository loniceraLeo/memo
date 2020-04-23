<template>
    <div class="comment">
        <jptb>
            <div v-if="comments">
                <div class="formwrapper">
                    <h1>Comment</h1>
                    <form id="myform">
                        <span class="nickwrapper">昵称: <input type="text" :class="['nickname', 'inf']"></span>
                        <span class="emailwrapper">邮箱: <input type="text" :class="['email', 'inf']"></span>
                        <span class="websitewrapper">网站(选): <input type="text" :class="['website', 'inf']"></span>
                        <div class="wrapper">
                            <textarea placeholder="支持markdown语法,暂不支持</>和表情,但是您可以使用颜文字 ;)" class="inputer"></textarea>
                        </div>
                        <button class="submit" @click.prevent="submit">评论</button>
                    </form>
                    <p class="info"><i :class="['fa', 'fa-exclamation-circle']"></i> 您的信息完全保密, 推荐使用qq邮箱以获取真实qq头像,
                        否则将使用默认妹红头像!
                        XD</p>
                </div>
                <div class="commentswrapper" v-if="comments">
                    <div v-for="(item, index) in comments" :class="['box', 'box' + index]" :key="index">
                        <div :class="['avatarwrapper']"><img :src='getAvatar(item)'></div>
                        <div :class="['nicknamewrapper']">
                            <a v-if="item.website" @click="jumpToWebsite(item.website)">{{item.nickname}}</a>
                            <span v-else>{{item.nickname}}</span>
                        </div>
                        <div :class="['contentwrapper']">
                            <div :class="['time']">
                                <span>发表于: <i :class="['fa', 'fa-clock-o']"></i>
                                    {{item.time.year}}年{{item.time.month}}月{{item.time.day}}日</span>
                                <button id="reply" @click="reply(item)">回复</button>
                            </div>
                            <hr />
                            <p :style="{marginTop: '-10px'}" v-html="marked(item.content)"></p>
                        </div>
                    </div>
                </div>
            </div>
        </jptb>
        <div v-if="loading" id="loading"><img src="@/assets/loading-svg/loading-balls.svg" alt="Loading icon"></div>
        <!-- loading image-->
    </div>
</template>

<script>
    import marked from "marked";
    export default {
        data: function () {
            return {
                /*comments: [{
                    nickname: 'lonicera',
                    email: '2192811348@qq.com',
                    website: 'baidu.com',
                    content: 'Hello world<a>嘿嘿</a>',
                    time: {
                        year: 2020,
                        month: 4,
                        day: 10
                    }
                }, {
                    nickname: 'lonicera',
                    email: '2192811348@qq.com',
                    website: 'hakula.xyz',
                    content: 'Hello world',
                    time: {
                        year: 2020,
                        month: 4,
                        day: 10
                    }
                }],*/
                loading: true,
                replyee: '',
            }
        },
        created() {
            this.fetchData();
            document.title = '留言区'
        },
        methods: {
            marked,
            submit() {
                let comment = {};
                let nickname = document.querySelectorAll('.nickname')[0].value;
                let email = document.querySelectorAll('.email')[0].value;
                let website = document.querySelectorAll('.website')[0].value;
                let content = document.querySelectorAll('.inputer')[0].value;
                let replyee = this.replyee;
                let test = nickname + email + website + content;
                if (!!nickname === false || !!email === false || !!content === false) {
                    alert('昵称/邮箱/评论不允许为空');
                } else if (test.match(/[;><\\]|(script)|(style)|(delete)|(alter)|(create)/gi)) {
                    alert('非法字符');
                } else if (!email.match(/@|\./gi)) {
                    alert('邮箱格式有误');
                } else {
                    comment = {
                        nickname,
                        email,
                        website,
                        content,
                        replyee
                    };
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', '/commentpost');
                    xhr.setRequestHeader('Content-Type', 'text/plain');
                    xhr.send(JSON.stringify(comment));
                    xhr.onerror = () => {
                        alert('评论失败了 :(');
                    }
                    xhr.onload = () => {
                        if (xhr.responseText === 'wrong') {
                            alert('评论失败了 :(');
                        } else {
                            alert('评论成功!');
                            location.reload();
                        }
                    }
                }
            },
            getAvatar(el) {
                if (el.email.match(/@qq\.com/gi)) {
                    let qid = el.email.split('@')[0];
                    return `https://q1.qlogo.cn/g?b=qq&nk=${qid}&s=640`
                } else {
                    return '/images/defaultHead.jpg'
                }
            },
            jumpToWebsite(tar) {
                window.location = `http://${tar}`;
            },
            reply(el) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                document.querySelectorAll('textarea')[0].value = `回复: @${el.nickname}:\n`;
                document.querySelectorAll('textarea')[0].focus();
                this.replyee = JSON.stringify({
                    nickname: el.nickname,
                    email: el.email
                });
            },
            fetchData() {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', '/commentinfo');
                xhr.setRequestHeader('Content-Type', 'text/plain');
                xhr.send();
                xhr.onload = () => {
                    this.loading = false;
                    this.comments = JSON.parse(xhr.responseText);
                    this.comments.forEach(item => {
                        item.time = JSON.parse(item.time);
                    });
                    this.comments.reverse();
                }
            }
        }
    }
</script>

<style scoped>
    a:hover {
        cursor: pointer;
    }

    .comment {
        position: static;
        padding-top: 80px;
        font-family: '宋体';
    }

    .commentswrapper {
        position: relative;
        width: 60%;
        margin: auto;
        top: 0px;
        min-width: 800px;
    }

    .box {
        position: relative;
        width: 100%;
        min-height: 160px;
    }

    #reply {
        position: absolute;
        right: 0px;
        top: 5px;
    }

    .avatarwrapper {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0px 0px 6px 4px rgba(255, 160, 100, .4);
    }

    .avatarwrapper img {
        width: 80px;
        height: 80px;
        transition: all .6s;
    }

    .avatarwrapper img:hover {
        transform: rotate(360deg);
    }

    .nicknamewrapper {
        position: absolute;
        width: 130px;
        height: 30px;
        top: 100px;
        left: -16px;
        background: rgba(255, 255, 255, 0);
        line-height: 30px;
        text-align: center;

        font-weight: bold;
        font-family: '宋体';
        font-size: 18px;
        color: darkslategray;
        letter-spacing: 1px;
    }

    .contentwrapper {
        position: relative;
        width: 76%;
        min-height: 110px;
        left: 130px;
        top: 0px;
        background: rgba(255, 255, 255, .88);
        border-radius: 15px;
        padding: 10px;
        padding-top: 0px;
        box-shadow: 0px 0px 5px 3px rgba(100, 100, 100, .3);
        font-size: 17.6px;
        line-height: 30px;
        letter-spacing: .5px;
        overflow: hidden;
    }

    .contentwrapper p {
        position: relative;
        left: 18px;
    }

    .time {
        position: relative;
        left: -10px;
        height: 25px;
        font-size: 14px;
    }

    .time span {
        position: absolute;
        display: block;
        left: 20px;
        top: 3px;
    }

    .formwrapper {
        position: relative;
        margin: auto;
        margin-bottom: 80px;
        width: 740px;
        height: 310px;
        background: rgba(255, 255, 255, .55);
        box-shadow: rgba(100, 100, 100, 0.3) 0px 0px 10px 3.3px;
        border-radius: 16px;
    }

    .wrapper {
        position: relative;
        margin: 0px;
        padding: 16px;
        bottom: 0px;
    }

    .formwrapper h1 {
        position: relative;
        font-size: 24px;
        font-weight: 300;
        letter-spacing: 2px;
        font-family: 'Times New Roman', Times, serif;
        top: 10px;
        -webkit-user-select: none;
        -moz-user-select: none;
    }

    .formwrapper h1::before {
        position: absolute;
        content: '';
        width: 40%;
        height: 3px;
        background: rgba(100, 100, 100, .8);
        top: 50%;
        left: 0;
    }

    .formwrapper h1::after {
        position: absolute;
        content: '';
        width: 40%;
        height: 3px;
        background: rgba(100, 100, 100, .8);
        top: 50%;
        right: 0;
    }

    #myform {
        position: relative;
        top: 40px;
    }

    .submit {
        position: relative;
        left: 85%;
        top: 0px;
        width: 90px;
        height: 30px;
    }

    .inf {
        position: relative;
        left: -5px;
        width: 110px;
        line-height: 18px;
        border-left: none;
        border-top: none;
        border-right: none;
        border-bottom: 2px solid rgba(100, 100, 100, .7);
        padding-left: 6px;
        background: none;

        font-size: 16px;
    }

    .nickwrapper {
        position: relative;
        left: 60px;
        top: -10px;
        font-weight: bold;
    }

    .emailwrapper {
        position: relative;
        left: 70px;
        top: -10px;
        font-weight: bold;
    }

    .websitewrapper {
        position: relative;
        left: 70px;
        top: -10px;
        font-weight: bold;
    }

    .email {
        width: 180px;
    }

    .website {
        width: 160px;
    }

    .inputer {
        position: relative;
        display: block;
        width: 97%;
        margin: auto;
        padding-top: 10px;
        padding-left: 10px;
        height: 110px;
        bottom: 0px;
        background: rgba(255, 255, 255, .7);
        border: none;

        font-size: 17px;
        resize: none;
    }

    input {
        outline: none;
    }

    .inputer:focus {
        outline: 1px solid burlywood;
    }

    .info {
        position: absolute;
        bottom: -5px;
        left: 30px;
        color: darkcyan;
        font-weight: bold;
    }
</style>