import React, { PureComponent } from 'react'
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

export default class Rootdiv extends PureComponent {

  render () {
    const { navs } = this.props;
    return (
      <div className="layout">
        
        <div className="flex">
          <HashRouter>
            <Switch>
              {
                navs.map(item => {
                  if (item.children && item.children.length) {
                    return item.children.map(it => {
                      return <Route exact={true} path={it.link} component={it.component} />
                    })
                  }else{
                    return <Route exact={true} path={item.link} component={item.component} />
                  }
                })
              }
              <Redirect to="/home/index" />
            </Switch>
          </HashRouter>
        </div>
      </div>
    )
  }
}
