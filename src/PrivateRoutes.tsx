import React from "react"
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const secured = true
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                secured ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect push to="/" />
                )
            }
        />
    )
}

export default PrivateRoute
