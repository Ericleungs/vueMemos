<template>
    <div class="headbox">
        <el-input 
            v-model="title" 
            placeholder="标题" 
            prefix-icon="el-icon-document-add"
            class="title_bar"
        >
        </el-input>
        <el-button class="btn" @click="bold">粗体</el-button>
        <el-button class="btn" @click="italic">斜体</el-button>
        <el-button class="btn" @click="underline">下划线</el-button>
        <el-button class="btn" @click="clear">清空</el-button>
        <el-button class="btn" @click="save">保存</el-button>
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
    border: 1px solid #000;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 200px;
    height: 100px;
    width: 800px;
}
.headbox>.btn{
    margin-top: 25px;
    height: 50px;
    border-radius: 10px;
}
.title_bar{
    margin-top: 25px;
    height: 50px;
    width: 200px;
    position: relative;
    right: 50px;
    line-height: 50px;
}
</style>