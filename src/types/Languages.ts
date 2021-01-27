/** Languages */
export enum LanguagesCode {
    English = "en",
    French = "fr",
    German = "de",
}

export const MapLanguageKey = {
    [LanguagesCode.English]: "English",
    [LanguagesCode.French]: "French",
    [LanguagesCode.German]: "German",
}

export const Languages = [
    {
        name: MapLanguageKey[LanguagesCode.English],
        code: LanguagesCode.English,
    },
    {
        name: MapLanguageKey[LanguagesCode.French],
        code: LanguagesCode.French,
    },
    {
        name: MapLanguageKey[LanguagesCode.German],
        code: LanguagesCode.German,
    },
]
