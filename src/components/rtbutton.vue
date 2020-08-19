<template>
    <div id='menu' ref='menu' class='rtmenu_decorator' :style="{visibility: vis, left:x, top:y}">
        <ul>
            <li @click="rtbtnSelection('rename')">重命名</li>
            <li @click="rtbtnSelection('delete')">删除</li>
            <li @click="rtbtnSelection('refresh')">刷新</li>
            <li @click="rtbtnSelection('close')">关闭</li>
        </ul>
    </div>
</template>


<script>
import bin from '@/components/bin.js';
export default{
    name: 'rtbutton',
    data(){
        return {
            // visible || hidden
            vis: 'hidden',
            top: '10px',
            left: '10px'
        }
    },
    created(){
        // right button menu receiver
        bin.$on('showRtBtnMenu',
            (options) => {
                let [x, y] = [options[0], options[1]];
                x = x - 168;
                y = y;
                if(x < 0){
                    x = -x;
                }
                if(y < 0){
                    y = -y;
                }
                this.vis = 'visible';
                // micro adjustment, the source is x without bias
                this.x = x + 'px';
                this.y = y + 'px';
            }
        );
        bin.$on('rtBtnMenu', 
            (flag) => {
                if(flag == 'close'){
                    this.rtbtnSelection('close');
                }
            }
        );
    },
    mounted(){
    },
    methods:{
        rtbtnSelection(option){
            if(option == 'close'){
                this.vis = 'hidden';
            }
            else if(option == 'rename'){
                bin.$emit('rtBtnMenu', 'rename');
            }
            else if(option == 'refresh'){
                this.refresh();
            }
            else if(option == 'delete'){
                bin.$emit('rtBtnMenu', 'delete');
            }
        },
        refresh(){
            location.reload();
        }
    }
}
</script>


<style scoped>
.rtmenu_decorator{
    width: 150px;
    border: 1px solid #999;
    box-shadow: 3px 3px 3px #ccc;
    background-color: #fff;
    position: absolute;
    top: 10px;
    left: 10px;
}
.rtmenu_decorator ul{
    list-style: none;
}
.rtmenu_decorator ul li{
    height: 40px;
    line-height: 40px;
}
.rtmenu_decorator ul li:hover{
    background-color: #ccc;
    font-weight: bold;
    color: #777;
    cursor: pointer;
}
</style>