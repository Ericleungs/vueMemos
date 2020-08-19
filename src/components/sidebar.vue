<template>
    <div>
        <el-container id='sideList'>
            <el-tree class="sidebar"
                :data="selection"
                :props="selection_props"
                
                node-key="id"
                :highlight-current="true" 
                ref="tree"
                @node-click="expandContent"
                @node-contextmenu="showRtBtnMenu"
            >
            <!--
            <el-tree class="sidebar"
                :data="selection"
                :props="selection_props"
                :render-content="renderContent"
                node-key="id"
                :highlight-current="true" 
                ref="tree"
                @node-click="expandContent"
            >
            -->
            </el-tree>
        </el-container>
    </div>
</template>


<script>
import bin from '@/components/bin.js';

// to remove element by content
var deleteByLabel = function(src_array, label){
    src_array.splice(src_array.indexOf(label), 1);
    let tar_array = src_array;
    return tar_array;
}

export default{
    name: "sidebar",
    data(){
        return {
            selection_props:{
                children: 'children',
                label: 'label'
            },
            selection:[],
            node:{
                nodeData: null,
                node: null,
            }
        }
    },
    methods:{
        seletion_click(date){
            // no effects
            console.log(`selection here ${date}`);
        },
        expandContent(data, node, comp){
            this.node.node = node;
            this.node.nodeData = data;
            let temp_node = this.node.node;
            // descendant node
            if(temp_node.childNodes.length == 0){
                bin.$emit('content', temp_node.parent.data.label);
            }
            // parent node
            else{
                // nothing need to do
                // console.log('this is parent node');
            }
        },
        showRtBtnMenu(e, data, node, comp){
            this.node.nodeData = data;
            this.node.node = node;
            let x = e.clientX;
            let y = e.clientY;
            bin.$emit('showRtBtnMenu', [x, y]);
        },
        reloadMenu(){
            let title_index = localStorage.getItem('title_index');
            if(title_index.length === 0){
                this.selection = null;
                return 0;
            }
            let article_set = title_index.split('\0');
            let counts = article_set.length;
            localStorage.setItem('counts', counts);
            let temp_dataset = [];
            for(let i = 0; i < counts; i++){
                let content = localStorage.getItem(article_set[i]);
                temp_dataset = temp_dataset.concat({
                    label: article_set[i],
                    children:[{label: content}]
                });
            }
            this.selection = temp_dataset;
        },
        rename(){
            this.closeMenu();
            let temp_node = this.node.node;
            let beforeName = null;
            // descendant
            if(temp_node.childNodes.length == 0){
                beforeName = temp_node.parent.data.label;
            }
            // parent
            else{
                beforeName = temp_node.data.label;
            }
            if(this.node.nodeData == null || this.node.node == null){
                alert('重命名非法！');
                return -1;
            }
            let rename_dialog = prompt('请输入新的名字');
            let aftName = rename_dialog;
            if(aftName == null){
                alert('重命名为空！');
            }
            else if(aftName == beforeName){
                alert('名字与之前的重复！');
            }
            else{
                let title_set = localStorage.getItem('title_index');
                let temp_content = localStorage.getItem(beforeName);
                // to divide into array
                title_set = title_set.split('\0');
                // title_set.splice(title_set.indexOf(beforeName), 1);
                title_set = deleteByLabel(title_set, beforeName);
                title_set.push(aftName);
                title_set.sort();
                // to compose into a store string
                title_set = title_set.join('\0');
                localStorage.setItem('title_index', title_set);
                localStorage.setItem(aftName, temp_content);
                localStorage.removeItem(beforeName);
                this.reloadMenu();
            }
        },
        deleteNode(){
            let temp_node = this.node.node;
            let nodeName = null;
            // descendant
            if(temp_node.childNodes.length == 0){
                nodeName = temp_node.parent.data.label;
            }
            // parent
            else{
                nodeName = temp_node.data.label;
            }
            let title_index = localStorage.getItem('title_index');
            let temp_content = localStorage.getItem(nodeName);
            title_index = title_index.split('\0');
            title_index = deleteByLabel(title_index, nodeName);
            localStorage.removeItem(nodeName);
            localStorage.setItem('title_index', title_index);
            this.reloadMenu();
            this.closeMenu();
        },
        closeMenu(){
            bin.$emit('rtBtnMenu', 'close');
        }
    },
    created(){
        // initialization
        let counter = localStorage.getItem('counts');
        if(counter == null){
            localStorage.setItem('counts', 0);
        }
        let title_index = localStorage.getItem('title_index');
        if(title_index != null){
            let article_set = title_index.split('\0');
            let counts = article_set.length;
            localStorage.setItem('counts', counts);
            let temp_dataset = [];
            // loading
            this.reloadMenu();
        }
        // right button menu receiver
        bin.$on('rtBtnMenu',
            (flag) => {
                if(flag == 'refresh'){
                    this.reloadMenu();
                }
                else if(flag == 'rename'){
                    this.rename();
                }
                else if(flag == 'delete'){
                    this.deleteNode();
                }
            }
        );
    },
    mounted(){
    }
}
</script>


<style scoped>
.sidebar{
    float: left;
    width: 200px;
    height: 700px;
    margin-top: 100px;
}
</style>