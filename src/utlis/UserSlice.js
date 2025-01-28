import { createSlice } from "@reduxjs/toolkit";

const UserSlicer = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser : (state ,action)=>{
           
            return action.payload
        },
        removeUser : (state ,action)=>{
            action.payload = null
        }
    }
})

export default UserSlicer.reducer
export const {addUser , removeUser} = UserSlicer.actions;