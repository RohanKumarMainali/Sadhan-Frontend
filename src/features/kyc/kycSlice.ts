import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface KycState {

    kycFormStage: number;
}

const initialState: KycState = {
    kycFormStage : 0
}

// action
const kycFormSlice = createSlice({
    name: 'counter',
    initialState,
    // reducer
    reducers: {
        //increment
        proceedKycForm(state) {
            // this works because it uses immer under the hood
            state.kycFormStage++;
        },
        //decrement
        //reset
    },
});

export const { proceedKycForm } = kycFormSlice.actions;

export default kycFormSlice.reducer;
