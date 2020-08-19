<template>
    <div class="headbox">
        <el-input 
            v-model="title" 
            placeholder="标题" 
            prefix-icon="el-icon-document-add"
            class="title_bar"
        >
        </el-input>
        <el-button class="btn" type="primary" @click="bold">粗体</el-button>
        <el-button class="btn" type="primary" @click="italic">斜体</el-button>
        <el-button class="btn" type="primary" @click="underline">下划线</el-button>
        <el-button class="btn" type="primary" @click="clear">清空</el-button>
        <el-button class="btn" type="primary" @click="save">保存</el-button>
        <!--
        <el-button class="btn" type="primary" @click="test">测试</el-button>
        -->
    </div>
</template>


<script>
import bin from '@/components/bin.js'
export default{
    name: 'headbox',
    data(){
        return {
            title: '请输入标题',
            h: 'helloworld!',
        }
    },
    methods:{
        logIt(params){
            console.log(`press it ${params}`);
        },

        // communicate to editor
        // by using media event file :
        // bin.js
        save(){
            bin.$emit("save", this.title);
        },
        italic(){
            bin.$emit("italic", 1);
        },
        bold(){
            bin.$emit("bold", 1);
        },
        underline(){
            bin.$emit("underline", 1);
        },
        clear(){
            bin.$emit("clear", 1);
        },
        testSelect(){
            bin.$emit("test", 1);
        },
        // communicate to editor above

        read_title(title){
            this.title = title;
        }
    },
    created(){
        bin.$on('content', 
            (title) => this.read_title(title)
        );
    }
}
</script>


<style scoped>
.headbox{
    position: absolute;
    top: 0;
    left: 200px;
    height: 100px;
    width: 800px;
    background-color: lightgreen;
}
.headbox>.btn{
    line-height: 25px;
    margin-top: 25px;
}
.title_bar{
    width: 200px;
    position: relative;
    right: 50px;
}
</style>