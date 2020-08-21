<template>
    <div class="editor_bgc">
        <el-input 
            id="editor_main"
            ref="editor_main"
            class="editor_main2" 
            type="textarea" 
            v-model="tempText"
            placeholder="请写下一些东西吧~"
            resize="none"
            :autosize="box_size"
        >
        </el-input>

        <div 
            id="show_pad"
            class="show_pad2"
            ref="show_pad"
            v-html="htmlText"
        >
        </div>        
        <!--
            replacement
        <input 
            id = "editor_main2"
            class="editor_main"
            type="text" 
            :value="tempText"
            v-html="italicText"
        >
        -->
        
    </div>
</template>


<script>
import bin from '@/components/bin.js';

// defined error below
function modeError(error_flag=1, message){
    if(1 == error_flag){
        this.name = "modeError";
        this.stack = (new Error()).stack;
    }
    else if(2 == error_flag){
        this.name = "modeError";
        this.stack = (new Error()).stack;
    }
}

modeError.prototype = Object.create(Error.prototype);
modeError.prototype.constructor = modeError;
// defined error above

export default{
    name: 'editor',
    data(){
        return {
            // buffer Area
            Buffer:{
                // positions
                startEdited: 0,
                endEdited: 0,
                lastEdited: 0,
                // flags
                timerLocked: false,
                firstLocked: false,
                // buffers
                buffer1: null,
                buffer2: null,
                // timer
                timer: null,
                timeElapse: 10000,
                // lengths
                bufferLen: 0,
                editedLen: 0
            },

            // text data
            empty: "",
            htmlText: "内容将会在这里显示",
            tempText: "",

            // flag
            edit_status: -1,
            skip_edit: false,

            // info
            box_size: {
                minRows: 14
            },
            mouse_focus: {
                focus_start: 0,
                focus_end: 0
            },
            msg: ""
        }
    },
    /*
    watch:{
        // Watch selected text
        window.getSelection().toString();
        let portal = document.getElementById("editor_main").mouseup(
            function(){
                let selected = window.getSelection;
                console.log(selected);
            }
        )
    },
    */

    methods:{
        testSelect(flag){
            let selected = (window.getSelection()).toString();
            let portal = document.getElementById('editor_main');
            let start = portal.selectionStart;
            let end = portal.selectionEnd;
            let len = end - start;
            let [gg_start, gg_end] = this.find_html(this.htmlText, selected, start, len);
        },
        checkEdited(src_html, start, end, mode){
            let [front_flag, rear_flag] = [0, 0];
            let front_slice = src_html.slice(0, start + 1);
            let rear_slice = src_html.slice(end + 1, src_html.length);
            let searchF, searchR;
            if(1 == mode){
                [searchF, searchR] = ['<i>', '</i>'];
            }
            else if(2 == mode){
                [searchF, searchR] = ['<b>', '</b>'];
            }
            else if(3 == mode){
                [searchF, searchR] = ['<u>', '</u>'];
            }
            if(front_slice.lastIndexOf(searchF) != -1){
                let [
                    f1, r1
                ] = [
                    front_slice.lastIndexOf(searchF),
                    front_slice.lastIndexOf(searchR)
                ];
                if(f1 > r1){
                    front_flag = 1;
                }
            }
            if(rear_slice.lastIndexOf(searchR) != -1){
                let [
                    f2, r2
                ] = [
                    rear_slice.indexOf(searchF),
                    rear_slice.indexOf(searchR)
                ];
                if(f2 > r2){
                    rear_flag = 1;
                }
            }
        },
        getTextSelection(){
            let portal = document.getElementById('editor_main');
            return [
                /*
                this.input_portal.selectionStart,
                this.input_portal.selectionEnd,
                */
                portal.selectionStart,
                portal.selectionEnd,
                (window.getSelection()).toString()
            ]
        },
        whole_wrapper(src, mode){
            let temp = src;
            let [
                i_tag, b_tag, ul_tag
            ] = [
                temp.indexOf(`<i>`), 
                temp.indexOf(`<b>`), 
                temp.indexOf(`<u>`)
            ];  // -1
            let [re0, re3, re4] = [
                ``, `\0\0\0`, `\0\0\0\0`
            ];
            // clear mode
            if (0 === mode){
                while(i_tag + b_tag + ul_tag > -3)
                {
                    temp = (
                        temp.replace('<u>', re0)
                        .replace('</u>', re0)
                        .replace('<i>', re0)
                        .replace('</i>', re0)
                        .replace('<b>', re0)
                        .replace('</b>', re0)
                    );
                    [ i_tag, b_tag, ul_tag ] = [
                        temp.indexOf(`<i>`), 
                        temp.indexOf(`<b>`), 
                        temp.indexOf(`<u>`)
                    ];
                }
            }
            
            // replace mode
            else if(1 === mode){
                while(i_tag + b_tag + ul_tag > -3)
                {
                    temp = (
                        temp.replace('<u>', re3)
                        .replace('</u>', re4)
                        .replace('<i>', re3)
                        .replace('</i>', re4)
                        .replace('<b>', re3)
                        .replace('</b>', re4)
                    );
                    [ i_tag, b_tag, ul_tag ] = [
                        temp.indexOf(`<i>`), 
                        temp.indexOf(`<b>`), 
                        temp.indexOf(`<u>`)
                    ];
                }
            }
            return temp;
        },
        remove_wrapper(src, tar, mode){
            if(1 == mode){
                if(tar.length > 1)
                    throw new modeError(`替换字符串过长！`);
                while(src.indexOf(tar) != -1){
                    src = src.replace(tar, '');
                }
            }
            return src;
        },
        find_html(html, src, src_start, len){
            // abnormal conditions
            if(src_start > html.length){
                console.log('abnormal parameters\n');
                return -1;
                // force to exit with return operations
            }else if(src_start + len > html.length){
                console.log('too long string');
                return -1;
            }
            let whole_wrapper = this.whole_wrapper;
            let remove_wrapper = this.remove_wrapper;
            let [index1, index2] = [0, 0];
            // replace tags into unused ASCII letter
            let rehtml = whole_wrapper(html, 1);
            let start = src_start;
            let null_clock = 0;
            let src_first = src[0];
            let src_last = src[len - 1];
        
            // starting
            while(true){
                null_clock += 1;
                if(null_clock > 10000){
                    console.log('Iteration Error, code: 1');
                    null_clock = 0;
                    break;
                }
                index1 = rehtml.indexOf(src_first);
                let slice1 = rehtml.slice(0, index1 + 1);
                let slice2 = remove_wrapper(slice1, '\0', 1);
                
                if(slice2.indexOf(src_first) != start){
                    rehtml = rehtml.replace(src_first, '\f');
                }else{
                    break;
                }
            }
            // ending
            while(true){
                null_clock += 1;
                if(null_clock > 10000){
                    console.log('Iteration Error, code: 2');
                    null_clock = 0;
                    break;
                }
                index2 = rehtml.indexOf(src_last);
                if(index2 < index1){
                    rehtml = rehtml.replace(src_last, '\f');
                }
                else {
                    break;
                }
            }
            while(true){
                null_clock += 1;
                if(null_clock > 10000){
                    console.log('Iteration Error, code: 3');
                    null_clock = 0;
                    break;
                }
                let slice3 = rehtml.slice(index1, rehtml.length + 1);
                index2 = slice3.indexOf(src_last);
                let slice4 = remove_wrapper(slice3, '\0', 1);
                if(slice4.indexOf(src_last) + 1 != len){
                    rehtml = rehtml.replace(src_last, '\f');
                }else{
                    index2 += index1;
                    break;
                }
            }
            return [index1, index2];
        },
        changeStyle(mode){
            let [
                temp_start,
                temp_end,
                temp
            ] = this.getTextSelection();
            
            let portal = document.getElementById('editor_main');
            let show_portal = document.getElementById('show_pad');
            let start = 0;
            let len = temp_end - temp_start;
            let end = show_portal.innerHTML.length;
            [temp_start, temp_end] = this.find_html(
                show_portal.innerHTML,
                temp, 
                temp_start, len
            );
            temp_end += 1;
            let front_slice = show_portal.innerHTML.slice(0, temp_start);
            let rear_slice = show_portal.innerHTML.slice(temp_end, end);
            let changed = null;

            // mode select
            if(1 == mode){
                changed = temp.italics();
            }
            else if(2 == mode){
                changed = temp.bold();
            }
            else if(3 == mode){
                changed = `<u>${temp}</u>`;
            }
            else{
                throw new modeError(1, `要求转换字体类型错误`);
            }
            // combine
            return front_slice + changed + rear_slice;
        },
        italic_operation(flag){
            if(flag == 1){
                this.htmlText = this.changeStyle(1);
            }
        },
        bold_operation(flag){
            if(1 == flag){
                this.htmlText = this.changeStyle(2);
            }
        },
        underline_operation(flag){
            if(1 == flag){
                this.htmlText = this.changeStyle(3);
            }
        },
        clearText(flag){
            if(1 === flag){
                // this.input_portal.value = this.empty;
                this.tempText = this.empty;
                this.htmlText = this.empty;
            }
        },
        // Unable to test it
        recordBuffer(){
            let portal = document.getElementById('editor_main');
            let buffer = this.Buffer;
            // this.Buffer.firstLocked = false;
            this.Buffer.endEdited = this.Buffer.startEdited + this.Buffer
            if(this.Buffer.startEdited != this.Buffer.endEdited){
                let slice1 = portal.value.slice(0, this.Buffer.startEdited + 1);
                let slice2 = portal.valie.slice(this.Buffer.startEdited, this.Buffer.endEdited);
                let [...end] = this.find_html(this.htmlText, slice1, 0, slice1.length);
                end++;
                // start to push in buffer
                if(this.Buffer.buffer1 == null && this.Buffer.buffer2 == null){
                    this.Buffer.buffer1 = slice2;
                }
                else if(this.Buffer.buffer1 != null){
                    this.Buffer.buffer2 = this.Buffer.buffer1;
                    this.Buffer.buffer1 = slice2;
                }
                this.Buffer.firstLocked = false;
                this.Buffer.lastEdited = this.Buffer.startEdited;
                this.Buffer.editedLen = this.Buffer.bufferLen;
            }
        },
        resetLock(){
            if(this.Buffer.timerLocked == false){
                this.Buffer.timerLocked = true;
                // this.Buffer.timer = setTimeout('this.recordBuffer()', this.Buffer.timeElapse);
                this.Buffer.timer = 
                    setTimeout(this.recordBuffer.bind(this), this.Buffer.timeElapse);
            }
            else{
                clearTimeout(this.Buffer.timer);
                // this.Buffer.timer = setTimeout('this.recordBuffer()', this.Buffer.timeElapse);
                this.Buffer.timer = 
                    setTimeout(this.recordBuffer.bind(this), this.Buffer.timeElapse);
            }
        },
        save(title){
            // null article
            let counts = 0;
            if(0 === title.length || title == "" || title == "请输入标题"){
                console.log("save operation error\n");
                return -1;
            }
            else{
                let db_name = 'title_index';
                // format: JSON
                let content = this.htmlText;
                let title_index = localStorage.getItem('title_index');
                // save title
                if(title_index == ''){
                    localStorage.setItem('title_index', title);
                }else{
                    let temp_index = localStorage.getItem('title_index');
                    temp_index = temp_index.split('\0');
                    temp_index.push(`${title}`);
                    temp_index.sort();
                    temp_index = temp_index.join('\0');
                    localStorage.setItem('title_index', temp_index);
                }

                // save article
                localStorage.setItem(title, content);
                // alert('Saved successfully!');
                bin.$emit('rtBtnMenu', 'refresh');
            }
            return 0;
        },
        read_content(title){
            let temp_content = localStorage.getItem(title);
            this.htmlText = temp_content;
            
            temp_content = this.whole_wrapper(temp_content, 0);
            this.tempText = temp_content;
        },
        editor_focus_func(){
            // when mouse is on editor
            // activate listener
            let editor_main = document.getElementById('editor_main');
            document.onmousedown = () => {
                this.mouse_focus.focus_start = editor_main.selectionStart;
            }
            document.onmouseup = () => {
                this.mouse_focus.focus_end = editor_main.selectionEnd;
            }
        }
    },
    created(){
        // 按键松开即可捕捉
        // 同步文本框和显示框的内容
        document.onkeyup = () => {
            // keyCatcher 传送门
            // let keyCatcher = this.input_portal.value;
            
            /*
            let keyCatcher = document.getElementById("editor_main").value;
            this.tempText = keyCatcher;
            this.htmlText = keyCatcher;
            */
            
            // buffer area
            /*
            if(this.Buffer.timerLocked == false){
                this.Buffer.timer = setTimeout('this.recordBuffer()', this.Buffer.timeElapse);
                this.Buffer.timerLocked = true;
            }
            else{
                clearTimeout(this.Buffer.timer);
                this.Buffer.timer = setTimeout('this.recordBuffer()', this.Buffer.timeElapse);
            }
            */
            
            // this.resetLock();
        }
        document.onkeydown = () => {
            /*
            // keycode here
            // currently not to search keyCode
            let portal = document.getElementById('editor_main');
            if(portal.selectionStart != portal.selectionEnd){
                if(this.Buffer.firstLocked == false){
                    this.Buffer.startEdited = portal.selectionStart;
                    this.Buffer.firstLocked = true;
                }
                this.Buffer.bufferLen++;
            }
            console.log(this.Buffer.bufferLen);
            */
        }
        bin.$on('aaa', (msg)=>{
            this.msg = msg;
            console.log(this.msg);
        });
        
        // signal receiver
        bin.$on('italic', 
            (flag) => this.italic_operation(flag)
        );
        bin.$on('bold',
            (flag) => this.bold_operation(flag)
        );
        bin.$on('underline',
            (flag) => this.underline_operation(flag)
        );
        bin.$on('clear', 
            (flag) => this.clearText(flag)
        );
        bin.$on('save', 
            (title) => this.save(title)
        );
        bin.$on('content',
            (title) => this.read_content(title)
        );
        bin.$on('skip-edit',
            (flag) => {
                this.skip_edit = true;
            }
        );
        // test selector signal
        bin.$on('test',
            // test portal here
            (flag) => this.testSelect(flag)
        );
    },
    watch:{
        tempText(){
            // skip read article
            if(this.skip_edit == true){
                this.skip_edit = false;
                return 1;
            }
            let debug_lock = 0;
            let placeholder = "内容将会在这里显示";
            let editor_main = document.getElementById('editor_main');
            let show_pad = document.getElementById('show_pad');
            let htmlLen = show_pad.innerHTML.length;
            let [keyStart, keyEnd] = [editor_main.selectionStart, editor_main.selectionEnd];
            let [mouseStart, mouseEnd] = [this.mouse_focus.focus_start, this.mouse_focus.focus_end];
            let [reStart, reEnd] = [0, 0];
            let selectedLen = mouseEnd - mouseStart;
            let sliced = null;
            let html = this.htmlText;
            let text = this.tempText;

            if(mouseStart > mouseEnd)
                [mouseStart, mouseEnd] = [mouseEnd, mouseStart];

            // null box condition
            if(0 === htmlLen || html === placeholder){
                sliced = '';
                [html, this.htmlText] = ['', ''];
                this.htmlText = this.tempText;
                // force to exit with return
                this.edit_status = 0;
                return 0;
            }
            /*
            // selection mode
            if(mouseStart != mouseEnd){
                sliced = editor_main.value.slice(start - 1, end);
                debugger;
            }
            // non-selection mode
            if(mouseStart == mouseEnd){
                // selected area > 1
                // focus only
                // without multi-selection
                selectedLen += 1;
            }
            // simple append mode
            if(keyEnd == text.length || mouseEnd == text.length){
                this.htmlText += text[text.length - 1];
                this.edit_status = 1;
                return 1;
            }
            */

            let editor_len = editor_main.value.length;
            let selectedStart = 0;
            if(mouseStart == mouseEnd){
                selectedLen = 1;
                selectedStart = keyStart - 2;
                sliced = editor_main.value.slice(keyStart - 2, keyStart - 1);
            }
            if(mouseStart != mouseEnd){
                if(mouseStart < keyStart){
                    /*
                        CAUTION:
                        here is to solve after re-formation,
                        solved bug: mouse focus still don't move
                    */
                    [this.mouse_focus.focus_start, this.mouse_focus.focus_end] = 
                        [keyStart, keyEnd];
                    [mouseStart, mouseEnd] = [keyStart, keyEnd]; // Just for easy to look up
                    sliced = editor_main.value[mouseEnd - 2];
                    selectedStart = keyStart;
                    selectedLen = 1;
                }
                else{
                    selectedStart = mouseStart;
                    sliced = editor_main.value.slice(mouseStart, mouseEnd);
                }
                /*
                    CAUTION: 
                    when it start to enter words,
                    mouse will exit multi-selection condition
                    and then change into append mode
                */
            }
            debugger;
            
            [reStart, reEnd] = this.find_html(
                html, sliced, selectedStart, selectedLen
            );
            reStart++;
            reEnd++;

            let front_slice = html.slice(0, reStart);
            let rear_slice = html.slice(reEnd, html.length);
            
            let changed = editor_main.value[reStart];
            if(this.htmlText.indexOf('<b>') != -1){
                debug_lock = 1;
            }
            if(debug_lock == 1){
                debugger;
                debug_lock = 0;
            }
            // debugger;
            let temp_string = front_slice + changed + rear_slice;
            this.htmlText = temp_string;
        }
    },
    mounted(){
        let editor_main_listener = this.$refs.editor_main;
        editor_main_listener.onfocus = this.editor_focus_func();
    }
}
</script>


<style scoped>
.editor_bgc{
    border: 1px solid #000;
    box-sizing: border-box;
    position: absolute;
    left: 200px;
    top: 100px;
    width: 800px;
    height: 600px;
}
.editor_main2{
    box-sizing: border-box;
    height: 300px;
    width: 750px;
    margin: 20px auto;
}
.show_pad2{
    box-sizing: border-box;
    border: 1px solid #000;
    height: 200px;
    width: 750px;
    margin: 20px auto;
    margin-left: 25px;
    text-align: left;
    white-space: pre-wrap;
    padding-top: 10px;
    padding-left: 15px;
    /*
        pre-wrap: 遇到换行不换行
    */
}
</style>