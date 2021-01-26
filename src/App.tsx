import React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import Widgets from "./pages/widgets"
import Add from "./pages/add"
import PrivateRoute from "./PrivateRoutes"

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Widgets} />
                <Route exact path="/add" component={Add} />
                {/* <PrivateRoute path="/:id" component={Add} /> */}
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App
