import React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import Widget from "./pages/widgets"
import AddWidget from "pages/widgets/AddWidget"


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Widget} />
                <Route exact path="/add" component={AddWidget} />
                {/* <PrivateRoute path="/:id" component={Add} /> */}
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App
