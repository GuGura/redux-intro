# Getting Started with Create React App

### Redux
redux는 React만을 위한 게 아니다.
```
npm i redux
```

### React-redux
그래서 React 환경에서 redux를 사용할 수 있게 도움을 주는 tools
```
npm i react-redux
```

### Redux-thunk
redux -> middleware -> state <br>
redux -> state 사이에 middleware가 있어서 갱신 전에 컨드롤 할 수 있는데 
middleware를 사용할 수 있게 해주는 툴
```
npm i redux-thunk
```

### Redux-devtools-extension
Chrome 스토어에서 redux-devtools 설치
middleware에 감싸서 사용해라
```
 npm i redux-devtools-extension
```

```js
import {composeWithDevTools} from "redux-devtools-extension";
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
```

### Redux/toolkit
최신버전 redux
위에 있는 모든걸 합쳐놨다.
```
npm install @reduxjs/toolkit
```
이전 버전
```js
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customer/customerSlice";

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})


const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;
```
뉴버전 
```js
import {configureStore} from "@reduxjs/toolkit";
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customer/customerSlice";

const store = configureStore({
    reducer:{
        account:accountReducer,
        customer:customerReducer
    }
})

export default store;
```