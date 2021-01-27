import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { WidgetsState } from "types"
import WidgetsReducer from "./reducers/Widgets"

export interface RootState {
    widgets: WidgetsState
}

const staticReducer = {
    widgets: WidgetsReducer,
}

const rootReducer = combineReducers<RootState>(staticReducer)

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)
