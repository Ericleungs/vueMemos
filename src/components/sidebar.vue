<template>
    <div>
        <el-container>
            <el-tree class="sidebar"
                :data="selection"
                :props="selection_props"
                @node-click="selection_click">
            </el-tree>
        </el-container>
    </div>
</template>


<script>
export default{
    name: "sidebar",
    data(){
        return {
            selection:[
                {
                    label: '2020/6/28',
                    children:[{
                        label: 'today happy'
                    }]
                },
                {
                    label: '1997',
                    children:[{
                        label:'I born'
                    }]
                }
            ]
        }
    },
    methods:{
        seletion_click(date){
            console.log(`selection here ${date}`);
        }
    },
    selection_props:{
        children: 'children',
        label: 'label'
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