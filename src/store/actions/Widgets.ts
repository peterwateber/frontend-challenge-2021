import { ThunkAction } from "redux-thunk"
import { Action } from "redux"
import { LanguagesCode, localStorageName, Widget, WidgetsState } from "types"

export enum WidgetsActionTypes {
    SET_WIDGETS = "set/widgets",
    SET_WIDGETS_ADD = "set/add/widgets",
    SET_LANGUAGE = "set/language",
}

export interface WidgetsAction {
    type: WidgetsActionTypes
    payload: Partial<WidgetsState>
}

/**
 * Action Creator
 */
export const getLocalStorage = (): ThunkAction<any, any, any, Action> => {
    return async (dispatch) => {
        const widgets = JSON.parse(
            window.localStorage.getItem(localStorageName) || "{}"
        )
        if (Boolean(Object.keys(widgets).length)) {
            dispatch(setLanguage(widgets.currentLanguage))
            dispatch(setWidgets(widgets.widgets))
        }
    }
}

export const removeItemFromWidget = (
    id: string
): ThunkAction<any, any, any, Action> => {
    return async (dispatch, getState) => {
        const { widgets } = getState()
        const newWidgets = widgets.widgets.filter(
            (widget: Widget) => widget.id !== id
        )
        dispatch(setWidgets(newWidgets))
    }
}

export const setWidgets = (widgets: Widget[]): WidgetsAction => ({
    type: WidgetsActionTypes.SET_WIDGETS,
    payload: {
        widgets,
    },
})

export const addWidgets = (widgets: Widget[]): WidgetsAction => ({
    type: WidgetsActionTypes.SET_WIDGETS_ADD,
    payload: {
        widgets,
    },
})

export const setLanguage = (currentLanguage: LanguagesCode): WidgetsAction => ({
    type: WidgetsActionTypes.SET_LANGUAGE,
    payload: {
        currentLanguage,
    },
})
