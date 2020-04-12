<template>
    <div>
        <h1>{{passage}}</h1>
    </div>
</template>

<script>
export default {
    props: {
        passage: {
            default: 'DeFault Content'
        }
    },
    data: function(){
        return {

        }
    }
}
</script>

<style scoped>
    h1 {
        font-family: 楷体;
    }
</style>