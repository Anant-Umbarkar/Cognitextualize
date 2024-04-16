import { createSlice,configureStore } from '@reduxjs/toolkit';
//{id:of conversation,messages:[]}
const FormSlice=createSlice({
    name:"ChatSlice",
    initialState:{
        Sequence:[],
        ModuleInfo:[],
        COInfo:[],
        selectedCO:[],
        FormData:{},
    },
    reducers:{
        changeSequence(state,actions){
            state.Sequence=actions.payload;
        },
        changeFormData(state,actions){
            state.FormData=actions.payload;
        },
        changeModuleInfo(state,actions){
            state.ModuleInfo=actions.payload;
        },
        changeCOInfo(state,actions){
            state.COInfo=actions.payload;
        },
        addSelectedCO(state,actions){
            state.selectedCO.push(actions.payload)
        }
    },
    
});


const store=configureStore({
    reducer:FormSlice.reducer,
})

export const FormActions=FormSlice.actions;
export default store;