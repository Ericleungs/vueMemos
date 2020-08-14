<template>
    <div>
        <el-container>
            
            <el-tree class="sidebar"
                :data="selection"
                :props="selection_props"
                
                node-key="id"
                :highlight-current="true" 
                ref="tree"
                @node-click="expandContent"
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
export default{
    name: "sidebar",
    data(){
        return {
            selection_props:{
                children: 'children',
                label: 'label'
            },
            selection:[]
        }
    },
    methods:{
        seletion_click(date){
            // no effects
            console.log(`selection here ${date}`);
        },
        expandContent(node){
            console.log(node);
        }
    },
    created(){
        // initialization
        let counter = localStorage.getItem('counts');
        if(counter === null){
            localStorage.setItem('counts', 0);
        }
        let title_index = localStorage.getItem('title_index');
        if(title_index === null){
            localStorage.setItem('title_index', 'no_articles_here');
        }
        else{
            let article_set = title_index.split('\0');
            let temp_dataset = [];
            // loading
            for(let i = 0; i < article_set.length; i++){
                let content = localStorage.getItem(article_set[i]);
                temp_dataset = temp_dataset.concat({
                    label: article_set[i],
                    children:[{label: content}]
                });
            }
            this.selection = this.selection.concat(temp_dataset);
        }
        
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