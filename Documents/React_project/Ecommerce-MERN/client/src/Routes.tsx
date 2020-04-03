import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/home/index'
import Speaker from './pages/speaker'
import Headphone from './pages/headphone'
import Television from './pages/television'
import headPhoneDetail from './pages/productDetail'
import AuthenticatePage from './pages/authenticatePage'
import Checkout from './pages/checkout'
import AdminDashboard from './pages/admin'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/products/speakers" component={Speaker} />
    <Route exact path="/products/headphones" component={Headphone} />
    <Route exact path="/products/televisions" component={Television} />
    <Route exact path="/products/speakers/:id" component={headPhoneDetail} />
    <Route exact path="/products/headphones/:id" component={headPhoneDetail} />
    <Route exact path="/products/televisions/:id" component={headPhoneDetail} />
    <Route exact path="/account/auth" component={AuthenticatePage} />
    <Route exact path="/checkout" component={Checkout} />
    <Route exact path="/admin/dashboard" component={AdminDashboard} />
  </Switch>
)

export default Routes
