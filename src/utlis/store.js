import { configureStore } from '@reduxjs/toolkit'

import  UserReducer from './UserSlice'

import  FeedReducer from './feedSlice'

export const Store = configureStore({
    reducer: {
        user : UserReducer,
        feed : FeedReducer
    }
})