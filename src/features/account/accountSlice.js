import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
}
const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, loanPurpose) {
                return {payload: {amount, loanPurpose}}
            },
            reducer(state, action) {
                if (state.loan > 0) return;

                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.loanPurpose;
                state.balance += action.payload.amount;
            }
        },
        payLoan(state, action) {
            state.loan = 0;
            state.loanPurpose = '';
            state.balance -= state.loan;
        }
    }
})
export const {deposit, payLoan, requestLoan, withdraw} = accountSlice.actions
export default accountSlice.reducer;


