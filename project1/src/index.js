
import './app'
import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Switch, HashRouter, Route } from 'react-router-dom'
const MOUNT_NODE = document.getElementById('root')
import navs from '$src/menu/nav'

class App extends React.Component {
  render () {
    return (
      <div className="app">
        <HashRouter >
          <React.Fragment>
            <Switch>
            {
              navs.map(nav => {
                return <Route key={nav.link.replace(/\//g, '_')} exact={nav.exact} path={nav.link} component={nav.component} />
              })
            }
            </Switch>
          </React.Fragment>
        </HashRouter>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, MOUNT_NODE)
}

render()

if (module.hot) {
  module.hot.accept(App, render)
}
