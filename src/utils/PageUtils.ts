import React from "react"
import { FrontEndWidgets } from "types"

interface TypeObj {
    [key: string]: any
}

export const sanitizeInput = (obj: TypeObj) => {
    let flag = false,
        errors = ""
    if (!Boolean(Object.values(obj).length)) throw new Error("Fields could not be empty.")
    Object.keys(obj).forEach((input: string) => {
        const _value = (obj[input] || "").toString().trim()
        if (!Boolean(_value)) {
            flag = true
            errors += `Field '${input}' cannot be empty.<br/>`
        }
        obj[input] = _value
    })
    if (flag) {
        throw new Error(errors.trim())
    }
    return obj
}

export const widgetOptions = (widget: FrontEndWidgets, idx: number) => {
    const path =
        widget === FrontEndWidgets.Datepicker
            ? `Form/Datepickers`
            : `Custom${widget}`
    return {
        id: idx,
        name: widget,
        component: React.lazy(
            () => import(`../pages/widgets/components/${path}`)
        ),
    }
}
