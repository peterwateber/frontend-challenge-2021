import React from "react"
import Home from ".."
import {
    cleanup,
    render,
    fireEvent,
    screen,
    waitForElementToBeRemoved,
} from "@testing-library/react"
import thunk from "redux-thunk"
import configureStore from "redux-mock-store"
import { Provider } from "react-redux"
import { FrontEndWidgets, LanguagesCode, Widget, WidgetsState } from "types"
import "@testing-library/jest-dom/extend-expect"
import "../../../translation.config"

const mockStore = configureStore([thunk])

describe("Home", () => {
    let component: any, store: any
    const mockData: WidgetsState = {
        widgets: [
            {
                id: "123",
                widget: FrontEndWidgets.Card,
                language: LanguagesCode.English,
            },
            {
                id: "1234",
                widget: FrontEndWidgets.Card,
                language: LanguagesCode.English,
            },
        ],
        currentLanguage: LanguagesCode.English,
    }

    afterEach(cleanup)

    beforeEach(() => {
        store = mockStore({
            widgets: mockData,
        })

        component = (override = {}) => {
            return render(
                <Provider store={store}>
                    <Home {...override} />
                </Provider>
            )
        }
    })

    it("should display all the available widgets", async () => {
        const card = await component().findAllByTestId("card")
        expect(card.length).toBe(2)
    })

    describe("remove a widget", () => {
        it("should prompt a dialog and remove the the widget from the list", async () => {
            const idToRemove = "123"
            const button = await component().findByTestId(
                `button-${idToRemove}`
            )
            fireEvent.click(button)

            const dialog = await component().findByTestId("dialog")
            expect(dialog).toBeTruthy()

            const buttonConfirm = await component().findByTestId(
                "button-dialog-confirm"
            )
            fireEvent.click(buttonConfirm)

            const removedElement = await component().findAllByTestId(
                `item-${idToRemove}`
            )

            waitForElementToBeRemoved(removedElement).then(async () => {
                expect(
                    await screen.findByTestId(`item-${idToRemove}`)
                ).not.toBeInTheDocument()
            })
        })
    })
})
