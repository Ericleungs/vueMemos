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
import bin from '@/components/bin.js'
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
        expandContent(node){
            console.log(node);
        },
        showRtBtnMenu(e, data, node, comp){
            /*
            console.log(e);
            console.log(data);
            console.log(node);
            console.log(comp);
            */
            let x = e.clientX;
            let y = e.clientY;
            bin.$emit('showRtBtnMenu', [x, y]);
            /*
            let sideList = document.getElementById('sideList');
            sideList.oncontextmenu = function(e){
                e.preventDefault();
                bin.$emit('rtBtnMenu', 1);
            }
            */
            
        },
        reloadMenu(){
            let title_index = localStorage.getItem('title_index');
            let article_set = title_index.split('\0');
            let counts = article_set.length;
            localStorage.setItem('counts', counts);
            let temp_dataset = [];
            for(let i = 0; i < article_set.length; i++){
                let content = localStorage.getItem(article_set[i]);
                temp_dataset = temp_dataset.concat({
                    label: article_set[i],
                    children:[{label: content}]
                });
            }
            this.selection = this.selection.concat(temp_dataset);
        }
    },
    created(){
        // initialization
        let counter = localStorage.getItem('counts');
        if(counter === null){
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
            }
        )
        
    },
    mounted(){
        /*
        let sideList = document.getElementById('sideList');
        sideList.oncontextmenu = function(e){
            e.preventDefault();
            bin.$emit('rtBtnMenu', 1);
        }
        */
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