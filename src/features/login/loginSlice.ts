import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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


// action
const loginSlice = createSlice({
  name: 'login',
  initialState,
  // reducer
  reducers: {
    //increment
    loginAuth(state) {
      // this works because it uses immer under the hood
      state.role = 'user'
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
    }

    //decrement
    //reset
  }
})

export const { loginAuth , loginAuthAdmin, logoutAuth} = loginSlice.actions

export default loginSlice.reducer
