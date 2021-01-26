import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

export interface RootState {}

const staticReducer = {}

const rootReducer = combineReducers<RootState>(staticReducer)

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)
