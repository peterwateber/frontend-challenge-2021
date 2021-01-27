import React from "react"
import { FrontEndWidgets } from "types"
import { sanitizeInput, widgetOptions } from "../PageUtils"
import { render } from "@testing-library/react"
import CustomCard from "pages/widgets/components/CustomCard"
import "../../translation.config"

describe("PageUtils", () => {
    it("should throw string error for empty object values for sanitizeInput()", () => {
        expect(() =>
            sanitizeInput({
                title: "",
                message: "",
            })
        ).toThrowError(
            "Field 'title' cannot be empty.<br/>Field 'message' cannot be empty.<br/>"
        )
    })

    it("should load component pased on widgetOptions()", () => {
        const Comp = widgetOptions(FrontEndWidgets.Card, 1)
        render(
            <React.Suspense fallback="loading">
                <Comp.component key="1" />
            </React.Suspense>
        )
        const card = render(
            <React.Suspense fallback="loading">
                <CustomCard />
            </React.Suspense>
        )
        expect(card).toMatchSnapshot()
    })
})
