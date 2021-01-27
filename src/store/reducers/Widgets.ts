import { WidgetsAction, WidgetsActionTypes } from "store/actions/Widgets"
import { LanguagesCode, localStorageName, WidgetsState } from "types"

const INITIAL_STATE: WidgetsState = {
    widgets: [],
    currentLanguage: LanguagesCode.English,
}

const WidgetsReducer = (
    state: WidgetsState = INITIAL_STATE,
    action: WidgetsAction
) => {
    switch (action.type) {
        case WidgetsActionTypes.SET_WIDGETS:
            const setWidgetsState = {
                ...state,
                widgets: action.payload.widgets || [],
            }
            window.localStorage.setItem(
                localStorageName,
                JSON.stringify({
                    currentLanguage: setWidgetsState.currentLanguage,
                    widgets: setWidgetsState.widgets,
                })
            )
            return setWidgetsState
        case WidgetsActionTypes.SET_WIDGETS_ADD:
            const setWidgetAdd = {
                ...state,
                widgets: state.widgets.concat(action.payload.widgets || []),
            }
            window.localStorage.setItem(
                localStorageName,
                JSON.stringify({
                    currentLanguage: setWidgetAdd.currentLanguage,
                    widgets: setWidgetAdd.widgets,
                })
            )
            return setWidgetAdd
        case WidgetsActionTypes.SET_LANGUAGE:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return {
                ...state,
            }
    }
}

export default WidgetsReducer
