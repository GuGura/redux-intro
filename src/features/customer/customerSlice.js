import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    fullName: '',
    nationalID: '',
    createdAt: '',
}
const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        updateName(state, action) {
            state.fullName = action.payload
        },
        createCustomer: {
            prepare(fullName, nationalID) {
                return {payload: {fullName, nationalID}}
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName
                state.nationalID = action.payload.nationalID;
                state.createdAt = new Date().toISOString();
            }
        }
    }
})
export const {updateName,createCustomer}
    = customerSlice.actions

export default customerSlice.reducer