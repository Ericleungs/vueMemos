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
                console.log([this.x, this.y]);
            }
        );
        /*
        bin.$on('rtBtnOption',
            (flags) => {
                if(args === 1){
                    this.vis = 'visible';
                }
                else if(args === 'close'){
                    this.vis = 'hidden';
                }
                else if(arguments === 'rename'){

                }
            }
        );
        */
    },
    mounted(){
        /*
        document.oncontextmenu = function(receive_event){
            let e = receive_event || window.event;
            let menu = document.getElementById('menu');

            // get mouse x and y
            let x = e.clientX;
            let y = e.clientY;

            // get window width and height
            let w = window.innerWidth;
            let h = window.innerHeight;

            // adjust width and height
            menu.style.left = Math.min(w - 202, x) + 'px';
            menu.style.right = Math.min(h - 230, y) + 'px';

            // remove default right button menu
            return false;
        }
        document.onclick = function(){
            let contextmenu = document.getElementById('menu');
            contextmenu.style.display = 'none';
        }*/
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
        },
        refresh(){
            location.reload();
        }
    }
}
</script>


<style scoped>
.rtmenu_decorator{
    width: 200px;
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
}
</style>