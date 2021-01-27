import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "store"
import App from "./App"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import "./translation.config"

// Override font
const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                fontFamily: "Lato, sans-serif !important",
            },
        },
        MuiTypography: {
            root: {
                fontFamily: "Lato, sans-serif !important",
            },
            body1: {
                fontSize: 14,
            },
        },
        MuiFormLabel: {
            root: {
                fontFamily: "Lato, sans-serif !important",
            },
        },
        MuiInput: {
            root: {
                fontFamily: "Lato, sans-serif !important",
            },
        },
        MuiOutlinedInput: {
            root: {
                fontFamily: "Lato, sans-serif !important",
            },
        },
        MuiTextField: {
            root: {
                fontFamily: "Lato, sans-serif !important",
            },
        },
        MuiMenuItem: {
            root: {
                fontFamily: "Lato, sans-serif !important",
            },
        },
    },
})

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <React.Suspense fallback="loading">
                <App />
            </React.Suspense>
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
