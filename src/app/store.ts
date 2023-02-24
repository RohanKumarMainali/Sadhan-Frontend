import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/CounterSlice'
import loginReducer from '../features/login/loginSlice'
import kycReducer from '../features/kyc/kycSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        kyc: kycReducer,
        login: loginReducer
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
