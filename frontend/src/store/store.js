import {configureStore} from "@reduxjs/toolkit"
import applicationReducer from "./applicationSlice.js"


const store = configureStore({
    reducer:{
        tracker: applicationReducer
    }
});

export default store;