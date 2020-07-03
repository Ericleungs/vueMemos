import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        italic: 10010,
        bold: 0
    },
    mutations:{
        toItalic(state){
            if(state.italic == 0){
                state.italic = 1;
            }else{
                state.italic = 0;
            }
        }
    }
})

export default store;