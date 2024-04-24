import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userId: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login: (state, action) =>{
            state.status = true;
            state.userId = action.payload.userId; 
        },

        logout: (state /*, action */) => {
            state.status = false;
            state.userId = null;
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer