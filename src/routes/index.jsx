import React, { lazy, Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import config from './config'

const { routes = [] } = config

export default () => {
  return (
    <>
      {
        routes.map(route => {
          const { children = [] } = route
          if (children.length > 0) {
            return (
              <Fragment
                key={route.path}
              >
                {
                  children.map(child => (
                    <Route
                      key={child.path}
                      path={child.path}
                      component={child.component}
                    />
                  ))
                }
                <Route
                  exact
                  key={route.path}
                  path={route.path}
                  render={() => <Redirect to={children[0].path} />}
                />
              </Fragment>
            )
          }
          return (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
            />
          )
        })
      }
      <Route
        exact
        path="/"
        render={() => <Redirect to={routes[0].path} />} />
    </>
  )
}
