import { createSlice,configureStore } from '@reduxjs/toolkit';
//{id:of conversation,messages:[]}
const FormSlice=createSlice({
    name:"ChatSlice",
    initialState:{
        Sequence:[],
        FormData:{},
    },
    reducers:{
        changeSequence(state,actions){
            state.Sequence=actions.payload;
        },
        changeFormData(state,actions){
            state.FormData=actions.payload;
        }
    },
    
});


const store=configureStore({
    reducer:FormSlice.reducer,
})

export const FormActions=FormSlice.actions;
export default store;