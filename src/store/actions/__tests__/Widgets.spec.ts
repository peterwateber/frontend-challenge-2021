import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import {
    FrontEndWidgets,
    LanguagesCode,
    localStorageName,
    Widget,
    WidgetsState,
} from "types"
import * as widgetsAction from "../Widgets"

const mockWindowProperty = (property: any, value: any) => {
    const { [property]: originalProperty } = window
    delete window[property]
    beforeAll(() => {
        Object.defineProperty(window, property, {
            configurable: true,
            writable: true,
            value,
        })
    })
    afterAll(() => {
        window[property] = originalProperty
    })
}

const mockStore = configureMockStore([thunk])

describe("Widgets Actions", () => {
    let mockGetItem: any

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

    let store = mockStore({
        widgets: [],
        currentLanguage: LanguagesCode.English,
    })

    mockWindowProperty("localStorage", {
        setItem: jest.fn(),
        getItem: (params: any) => mockGetItem(params),
        removeItem: jest.fn(),
    })

    beforeEach(() => {
        mockGetItem = jest.fn().mockReturnValue(null)
        window.localStorage.setItem(localStorageName, JSON.stringify(mockData))
    })

    it("should get from localStorage and save to store", async () => {
        mockGetItem = jest.fn().mockReturnValue(JSON.stringify(mockData))
        store.dispatch(widgetsAction.getLocalStorage() as any)
        expect(mockGetItem.mock.calls.length).toBe(1)
        expect(store.getActions()).toEqual([
            widgetsAction.setLanguage(LanguagesCode.English),
            widgetsAction.setWidgets(mockData.widgets),
        ])
    })
    
    it("should remove item to widget", async () => {
        store = mockStore({
            widgets: mockData,
            currentLanguage: LanguagesCode.English,
        })
        store.dispatch(widgetsAction.removeItemFromWidget("123") as any)
        const expectedActions = [
            {
                type: widgetsAction.WidgetsActionTypes.SET_WIDGETS,
                payload: {
                    widgets: [],
                },
            }
        ]
        expect(store.getActions()).toEqual(expectedActions)
    })

    it("should set item to widget", async () => {
        const expectedActions = {
            type: widgetsAction.WidgetsActionTypes.SET_WIDGETS,
            payload: {
                widgets: mockData.widgets,
            },
        }
        expect(widgetsAction.setWidgets(mockData.widgets)).toEqual(
            expectedActions
        )
    })

    it("should add item to widget", async () => {
        const expectedActions = {
            type: widgetsAction.WidgetsActionTypes.SET_WIDGETS_ADD,
            payload: {
                widgets: mockData.widgets,
            },
        }
        expect(widgetsAction.addWidgets(mockData.widgets)).toEqual(
            expectedActions
        )
    })

    it("should set language", async () => {
        const expectedActions = {
            type: widgetsAction.WidgetsActionTypes.SET_LANGUAGE,
            payload: {
                currentLanguage: mockData.currentLanguage,
            },
        }
        expect(widgetsAction.setLanguage(mockData.currentLanguage)).toEqual(
            expectedActions
        )
    })
})
