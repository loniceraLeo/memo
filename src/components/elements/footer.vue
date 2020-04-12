<template>
  <div id="footer">
      <div class="wrapper">
            <span class="info" onselectstart="return false;">© 2020-present Lonicera</span><br/>
            <span class="themeinfo" onselectstart="return false;">Theme | spark</span>
      </div>
  </div>
</template>

<script>
export default {
    data: function(){
        return {
            
        }
    },
    methods: {
        footerpos() {
            return document.body.offsetHeight < screen.height ? '-300px' : '0';
        },
    }
}
</script>

<style scoped>
#footer {
    position: relative;
}
.wrapper {
    position: relative;
    text-align: center;
}
.info {
    position: relative;
    color: rgb(60, 80, 40);
    font-size: 24px;
    font-weight: 520;
}
.info:hover {
    cursor: default;
}
.themeinfo {
    position: relative;
    color: rgb(60, 80, 40);
    font-size: 24px;
    font-weight: 600;
}
.themeinfo:hover {
    cursor: default;
}
</style>