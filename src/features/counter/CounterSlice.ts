import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {

    value: number;
}

const initialState: CounterState = {
    value: 10
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        //increment
        increment(state) {
            // this works because it uses immer under the hood
            state.value++;
        },
        //decrement
        //reset
    },
});

export const { increment } = counterSlice.actions;

export default counterSlice.reducer;
