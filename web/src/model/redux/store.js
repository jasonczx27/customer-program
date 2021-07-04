import {createStore} from "redux";
import reducers from "./reducers/login"

function reduxStore(state) {
    try {
        const serializedState=JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (ex) {
        console.log(ex);
    }
}

function reduxLoad() {
    try {
        const serializedState=localStorage.getItem("state");
        if (serializedState===null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
}

const persistState=reduxLoad()

const store=createStore(reducers,
    persistState,
    window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(() => reduxStore(store.getState()))

export default store