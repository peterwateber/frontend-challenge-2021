import { LanguagesCode } from "./Languages"

export enum FrontEndWidgets {
    Card = "Card",
    Dialog = "Dialog",
    Datepicker = "Datepicker",
}

export interface Widget {
    id: string,
    widget: FrontEndWidgets
    language: LanguagesCode
}

export interface WidgetsState {
    widgets: Widget[]
    currentLanguage: LanguagesCode
}

export const localStorageName = "items"
