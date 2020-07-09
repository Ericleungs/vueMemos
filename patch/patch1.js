var patch1 = {
  data(){
    return {
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
        // lengths
        bufferLen: 0,
        editedLen: 0
      }
    }
  },
  // find_html(html, src, start, length)
  created(){
    var portal = document.getElementById("editor_main");
    document.onKeyDown = () => {
      // 检测是不是键盘上对应的按键
      if(portal.selectionStart != portal.selectionEnd){
        if(this.Buffer.firstLocked == false){
          this.Buffer.startEdited = portal.selectionStart;
          this.Buffer.firstLocked = true;
        }
        this.Buffer.buffer_len++;
      }
    };
    document.onKeyUp = () => {
      // 检测是不是键盘上对应的按键
      if (this.timerLocked == false){
        this.timer = setTimeout('recordBuffer()', 5000);
        this.timerLocked = true;
      }
      else{
        clearTimeout(timer);
        timer = setTimeout('recordBuffer()', 5000);
      }
    }
  },
  methods:{
    recordBuffer(){
      let portal = document.getElementById('editor_main');
      let buffer = this.Buffer;
      this.Buffer.firstLocked = false;
      this.Buffer.endEdited = this.Buffer.startEdited + this.Buffer.buffer_len;
      // �����ڲ�ͬ��λ�÷����˱䶯
      if(this.Buffer.startEdited != this.Buffer.endEdited){
        let slice1 = portal.value.slice(0, this.Buffer.startEdited + 1);
        let slice2 = portal.value.slice(this.Buffer.startEdited, this.Buffer.endEdited);
        let [start, end] = this.find_html(this.htmlText, slice1, 0, slice1.length);
        end++;
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
      /*
      buffer.firstLocked = false;
      buffer.endEdited = buffer.startEdited + buffer.buffer_len; 
      if(buffer.startEdited != buffer.endEdited){
        let slice1 = portal.value.slice(0, buffer.startEdited + 1);
        let slice2 = portal.value.slice(buffer.startEdited, buffer.endEdited);
        let [start, end] = this.find_html(this.htmlText, slice1, 0, slice1.length);
        end++;
        if(buffer.buffer1 == null && buffer.buffer2 == null){
          buffer.buffer1 = slice2;
        }
        else if(buffer.buffer1 != null){
          buffer.buffer2 = buffer.buffer1'
        buffer.buffer1 = slice2;
        }
        buffer.firstLocked = false;
        buffer.lastEdited = buffer.startEdited;
        buffer.editedLen = buffer.bufferLen;
      }
      */
    },
    rollback(){
      let portal = document.getElementById('editor_main');
      let buffer = this.Buffer;
      // ʶ���ǲ��ǰ�����Ctrl + Z
      // recognition operation
      if(this.Buffer.buffer1 == null){
        return null;
      }
      let lastEdited = this.Buffer.lastEdited;
      let editedLen = this.Buffer.editedLen;
      let [start, end] = this.find_html(this.htmlText, )
    }
  }
}