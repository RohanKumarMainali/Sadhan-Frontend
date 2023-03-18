import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import {useAppDispatch, useAppSelector} from '../../app/hooks'

interface loginState {
  role: string;
  loggedIn: boolean;
}

interface userType {
    role: string,
}

const data : any = localStorage.getItem('user');

const initialState: loginState = {
  role: data?.role ? data.role : '' , 
  loggedIn: false,
}

const url = 'http://localhost:5000/api'
const getTokenFromCookies = async () => {
const response = await axios.get(`${url}/token`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        )
        let accessToken = ''
        let refreshToken = ''
        if (response) {
            accessToken = response.data.accessToken;
            refreshToken = response.data.refreshToken;
        }
        return { accessToken, refreshToken }
    }

const renewToken = async () => {
        try {
            const { refreshToken } = await getTokenFromCookies();

            if (refreshToken !== '') {
               const response = await  axios(`${url}/renewToken`, {
                 method: "post",
                 data: {refreshToken: refreshToken} ,
                 withCredentials: true
                 })
                const details = response.data.payload;
                localStorage.setItem('user', JSON.stringify(response.data.payload))
                return details.role
            }
        } catch (error) {
            return ''
        }
    }

export const getUserThunk = createAsyncThunk("getUser/",async(thunkAPI)=>{
         try {
            const response = await axios.get(`${url}/session`, {
                headers: {
                    'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            let details = response.data.payload
            return details.role

        } catch (error: any) {
            localStorage.clear();
            if (error.response.data == 'jwt expired') {
                console.log('jwt expired')
                const newRole = await renewToken();
                return newRole;
            }
            return '';
        }
    
})


// action
const loginSlice = createSlice({
  name: 'login',
  initialState,
  // reducer
  reducers: {
    //increment
    loginAuth(state) {
      // this works because it uses immer under the hood
      state.role = ''
      state.loggedIn = true
    },
    loginAuthAdmin(state) {
      // this works because it uses immer under the hood
      state.role = 'admin'
      state.loggedIn = true
    },
    logoutAuth(state) {
      state.role = ''
      state.loggedIn = false
    },  
  },


    extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(getUserThunk.fulfilled, (state :any, { payload }:any) => {
        console.log(payload)
      state.role = payload
      if(payload == 'user' || payload == 'admin')state.loggedIn = true;
    });

    }

})

export const { loginAuth , loginAuthAdmin, logoutAuth} = loginSlice.actions

export default loginSlice.reducer
