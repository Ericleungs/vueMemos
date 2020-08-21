<template>
  <div id="app">
    <!--
      注意： 这里需要内联，不然会被element本身的UI覆盖掉
    -->
    <el-container>
      <el-aside style="width: 200px">
        <sidebar></sidebar>
      </el-aside>
      <el-container>
        <el-header style="height: 100px">
          <headbox></headbox>
        </el-header>
        <el-main>
          <editor></editor>
        </el-main>
        <el-footer>
          <rtbutton></rtbutton>
        </el-footer>
      </el-container>
    </el-container>
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
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 700px;
  width: 1000px;
  position: absolute;
  left: 50%;
  margin-left: -500px;

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
