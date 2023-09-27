import {combineReducers, createStore} from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
}

const initialStateCustomer = {
    fullName: '',
    nationalID: '',
    createdAt: '',
}


function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case 'account/deposit':
            return {...state, balance: state.balance + action.payload}
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
        default :
            return state;
    }
}

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case 'customer/createCustomer':
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt
            }
        case 'customer/updateName':
            return {...state, fullName: action.payload}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})

const store = createStore(rootReducer);


console.log('Hey redux');

function deposit(amount) {
    return {type: 'account/deposit', payload: amount}
}

function withdraw(amount) {
    return {type: 'account/withdraw', payload: amount}
}

function requestLoan(amount, loanPurpose) {
    return {
        type: 'account/requestLoan',
        payload: {amount, loanPurpose}
    }
}

function payLoan() {
    return {type: 'account/payLoan'}
}

store.dispatch(deposit(500))
console.log(store.getState());

store.dispatch(withdraw(200))
console.log(store.getState());

store.dispatch(requestLoan(1000, 'Buy a car'))
console.log(store.getState());

store.dispatch(payLoan())
console.log(store.getState());

function createCustomer(fullName, nationalID) {
    return {
        type: 'customer/createCustomer',
        payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString()
        }
    }
}

function updateName(fullName) {
    return {type: ' account/updateName', payload: fullName}
}

store.dispatch(createCustomer('Jonas Kim', '4823978501'))
console.log(store.getState());

store.dispatch(deposit(250))
console.log(store.getState());


















