<template>
  <div id="app">
    <sidebar></sidebar>
    <headbox></headbox>
    <editor></editor>
    <rtbutton></rtbutton>
  </div>
</template>

<script>
import sidebar from '@/components/sidebar'
import editor from '@/components/editor'
import headbox from '@/components/headbox'
import rtbutton from '@/components/rtbutton'
import bin from '@/components/bin.js'
export default {
  name: 'App',
  components: {
    sidebar,
    editor,
    headbox,
    rtbutton
  },
  methods:{
    a(){
      console.log(`helloworld`);
    }
  },
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app{
  height: 700px;

  width: 1000px;
  position: absolute;
  left: 50%;
  margin-left: -500px;
  background-color: yellow;

  /*
    水平居中：
      绝对定位，left50%，左边缘是宽度的-0.5倍数
  */
}
*{
  margin: 0;
  padding: 0;
}
</style>
