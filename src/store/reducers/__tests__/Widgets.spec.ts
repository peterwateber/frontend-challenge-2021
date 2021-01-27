import { WidgetsActionTypes } from "store/actions/Widgets"
import { FrontEndWidgets, LanguagesCode, WidgetsState } from "types"
import widgetsReducer from "../Widgets"

const mockData: WidgetsState = {
    widgets: [
        {
            id: "123",
            widget: FrontEndWidgets.Card,
            language: LanguagesCode.English,
        },
    ],
    currentLanguage: LanguagesCode.English,
}

describe("Widgets reducers", () => {
    it("should return the initial state", () => {
        expect(
            widgetsReducer(undefined, {
                type: "",
                payload: "'",
            } as any)
        ).toEqual({
            currentLanguage: LanguagesCode.English,
            widgets: [],
        })
    })

    it("should handle SET_WIDGETS", () => {
        expect(
            widgetsReducer(undefined, {
                type: WidgetsActionTypes.SET_WIDGETS,
                payload: {
                    widgets: mockData.widgets,
                },
            })
        ).toEqual({
            currentLanguage: LanguagesCode.English,
            widgets: mockData.widgets
        })
    })
    
    it("should handle SET_WIDGETS_ADD", () => {
        expect(
            widgetsReducer(undefined, {
                type: WidgetsActionTypes.SET_WIDGETS_ADD,
                payload: {
                    widgets: mockData.widgets,
                },
            })
        ).toEqual({
            currentLanguage: LanguagesCode.English,
            widgets: mockData.widgets
        })
    })

    
    it("should handle SET_LANGUAGE", () => {
        expect(
            widgetsReducer(undefined, {
                type: WidgetsActionTypes.SET_LANGUAGE,
                payload: {
                    currentLanguage: LanguagesCode.French
                },
            })
        ).toEqual({
            currentLanguage: LanguagesCode.French,
            widgets: []
        })
    })
})
