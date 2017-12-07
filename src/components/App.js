import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './shared/Header'
import DashContainer from './dash/DashContainer'
import UserContainer from './user/UserContainer'
import MoldContainer from './mold/MoldContainer'
import MuoviContainer from './muovi/MuoviContainer'
import KiekkoContainer from './kiekko/KiekkoContainer'

const NotFound = () => (
  <div className="container">
    <div className="jumbotron">
      <h1>Page not Found 404!</h1>
    </div>
  </div>
)

const Routes = () => (
  <div className="container pt-5">
    <Switch>
      <Route exact path="/" component={DashContainer} />
      <Route exact path="/users" component={UserContainer} />
      <Route exact path="/kiekot" component={KiekkoContainer} />
      <Route exact path="/molds" component={MoldContainer} />
      <Route exact path="/muovit" component={MuoviContainer} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

const App = () => (
  <div className="app">
    <Header />
    <Routes />
  </div>
)

export default App
