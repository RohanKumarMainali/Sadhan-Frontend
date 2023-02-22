import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/CounterSlice'
import loginReducer from '../features/login/loginSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        login: loginReducer
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
