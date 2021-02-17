import React from "react"
import { Switch, Route } from "react-router-dom";
import Login from "./Login"
import Product from "./Product"
import Customer from "./Customer"
import Transaction from "./Transaction"
import Home from "./Home"
import Admin from "./Admin"

const Utama = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/product" component={Product} />
        <Route path="/customer" component={Customer} />
        <Route path="/transaction" component={Transaction} />
        <Route path="/admin" component={Admin} />
    </Switch>
)

export default Utama