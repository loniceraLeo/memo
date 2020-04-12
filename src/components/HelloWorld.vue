<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>涤净内心</h3>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-family: 楷体;
  font-size: 46px;
}
h3 {
  margin: 40px 0 0;
  font-family: 华文隶书;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
