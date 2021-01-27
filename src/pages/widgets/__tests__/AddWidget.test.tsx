import React from "react"
import AddWidget from "../AddWidget"
import { cleanup, render, fireEvent, within } from "@testing-library/react"
import thunk from "redux-thunk"
import configureStore from "redux-mock-store"
import { Provider } from "react-redux"
import { LanguagesCode } from "types"
import * as widgetActions from "../../../store/actions/Widgets"
import "../../../translation.config"

const mockStore = configureStore([thunk])

describe("AddWidget", () => {
    let component: any, store: any

    afterEach(cleanup)

    beforeEach(() => {
        store = mockStore({
            widgets: [],
        })

        component = () => {
            return render(
                <Provider store={store}>
                    <AddWidget currentLanguage={LanguagesCode.English} />
                </Provider>
            )
        }
    })

    it("should validate form", async () => {
        const button = await component().findByTestId("submitbtn")
        fireEvent.click(button)
        const dialog = await component().findByTestId("dialog")
        expect(dialog).toBeTruthy()
    })

    it("should process the form", async () => {
        component = render(
            <Provider store={store}>
                <AddWidget currentLanguage={LanguagesCode.English} />
            </Provider>
        )
        const button = await component.findByTestId("submitbtn")
        

        const inputWidget = await component.findByLabelText("Select widget")
        inputWidget.focus()
        selectAutocomplete(inputWidget, "C")

        const inputLang = await component.findByLabelText("Select language")
        inputLang.focus()
        selectAutocomplete(inputLang, "e")

        const preview = await component.findByTestId("preview")
        expect(preview).toBeTruthy()
        

        fireEvent.click(button)
        expect(window.location.href).toBe("http://localhost/")
    })
})

const selectAutocomplete = (input: any, keyword: string) => {
    fireEvent.change(input, { target: { value: keyword } })
    fireEvent.keyDown(input, {
        key: "ArrowDown"
    })
    fireEvent.keyDown(input, {
        key: "Enter",
    })
}
