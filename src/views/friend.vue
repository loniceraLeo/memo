<template>
    <div class="friend">
        <jptb>
            <div class="wrapper" v-if="friends">
                <img src="@/assets/sakura.jpg">
                <h1>传送门</h1>
                <div class="linkwrapper">
                    <table class="links">
                        <th :style="{color: 'red'}">[ 友链 ]</th>
                        <tr v-for="(item, index) in friends" :key="index">
                            <td><a :href="item[0].website" v-if="item[0]">{{item[0].nickname}}</a></td>
                            <td><a :href="item[1].website" v-if="item[1]">{{item[1].nickname}}</a></td>
                            <td><a :href="item[2].website" v-if="item[2]">{{item[2].nickname}}</a></td>
                        </tr>
                    </table>
                </div>
            </div>
        </jptb>
        <div v-if="loading" id="loading"><img src="@/assets/loading-svg/loading-balls.svg" alt="Loading icon"></div>
        <!-- loading image-->
    </div>
</template>

<script>
    export default {
        created() {
            this.fetchData();
            document.title = '友链'
        },
        data: function () {
            return {
                /*friends: [
                    [
                        {
                            nickname: 'hakula',
                            website: 'https://hakula.xyz'
                        }, {
                            nickname: '蝉时雨',
                            website: 'https://chanshiyu.com'
                        }, {
                            nickname: 'dalao',
                            website: 'https//loniceraleo.xyz'    
                        }
                    ]
                ],*/
                loading: true
            }
        },
        methods: {
            fetchData() {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', '/friendinfo');
                xhr.setRequestHeader('Content-Type', 'text/plain');
                xhr.send();
                xhr.onload = () => {
                    this.loading = false;
                    let temp = [];
                    this.friends = JSON.parse(xhr.responseText);
                    for (let i = 0; i < this.friends.length; i += 3) {
                        temp.push([this.friends[0], this.friends[1], this.friends[2]]);
                    }
                    this.friends = temp;
                    console.log(this.friends);
                }
            }
        },
    }
</script>

<style scoped>
    .friend {
        padding-top: 80px;
    }

    .links a {
        font-size: 22px;
    }

    .links a:hover {
        cursor: pointer;
    }

    .links {
        position: relative;
        padding-top: 30px;
        width: 100%;
        font-family: '宋体';
        font-size: 20px;
    }

    .links th {
        position: relative;
        margin-bottom: 30px;
        left: 33%;
        top: -20px;
    }

    .links tr {
        position: relative;
    }

    .links td {
        text-align: center;
        width: 33.3%;
        height: 50px;
        line-height: 50px;
        font-weight: bold;
    }

    .wrapper {
        position: relative;
        margin: auto;
        width: 800px;
        min-height: 800px;
        background: rgba(255, 255, 255, .6);
        border-radius: 20px;
        box-shadow: 0px 0px 6px 5px rgba(100, 100, 100, .3);
        overflow: hidden;
    }

    .wrapper img {
        position: relative;
        top: -20px;
        width: 800px;
        height: 430px;
    }

    .wrapper h1 {
        position: relative;
        letter-spacing: 5px;
        font-family: '宋体';
    }

    .wrapper h1::before {
        content: '';
        position: absolute;
        width: 40%;
        left: 0px;
        height: 2px;
        top: 50%;
        background: black;
    }

    .wrapper h1::after {
        content: '';
        position: absolute;
        width: 40%;
        right: 0px;
        height: 2px;
        top: 50%;
        background: black;
    }

    .linkwrapper {
        position: relative;
        top: 20px;
        width: 80%;
        min-height: 300px;
        margin: auto;
        background: rgba(255, 255, 255, .4);
    }
</style>