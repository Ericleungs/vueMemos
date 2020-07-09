var editor_pach = {
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

            // portals
            input_portal: document.getElementById('editor_main'),

            box_size: {
                minRows: 14
            },
            msg: ""
        }
    },
    methods:{
        resetLock(){

        }
    },
    created(){
        document.onkeydown = () => {
            
        }
    }
}