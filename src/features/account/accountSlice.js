const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
}
const host = 'api.frankfurter.app';
export default function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case 'account/deposit':
            return {
                ...state,
                balance: state.balance + action.payload,
                isLoading: false
            }
        case 'account/withdraw':
            return {...state, balance: state.balance - action.payload}
        case 'account/requestLoan':
            if (state.loan > 0) return state;
            // LATER
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.loanPurpose,
                balance: state.balance + action.payload.amount
            }
        case 'account/payLoan':
            return {
                ...state,
                loan: 0,
                loanPurpose: '',
                balance: state.balance - state.loan
            }
        case 'account/convertingCurrency':
            return {
                ...state,
                isLoading: true
            }
        default :
            return state;
    }
}

export function deposit(amount, currency) {
    if (currency === 'USD')
        return {type: 'account/deposit', payload: amount}

    return async (dispatch, getState) => {
        dispatch({type: 'account/convertingCurrency'})
        //API CALL
        const res = await fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await res.json();
        const converted = data.rates.USD
        dispatch({type: 'account/deposit', payload: converted})
    }
}

export function withdraw(amount) {
    return {type: 'account/withdraw', payload: amount}
}

export function requestLoan(amount, loanPurpose) {
    return {
        type: 'account/requestLoan',
        payload: {amount, loanPurpose}
    }
}

export function payLoan() {
    return {type: 'account/payLoan'}
}
