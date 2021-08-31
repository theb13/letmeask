import { Route, Switch } from "react-router-dom"
import { AdminRoom } from "../pages/AdminRoom"
import { Home } from "../pages/Home"
import { NewRoom } from "../pages/NewRoom"
import { Room } from "../pages/Room"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
    )
}

export default Routes
