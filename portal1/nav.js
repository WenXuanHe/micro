import Loadable from 'react-loadable'
import React from 'react'
import Home from './src/home'
export const asyncLoadable = (loader) => {
  return Loadable({ loader: loader, loading: () => <div>loading</div> })
}

export default [
  {
    name: 'home',
    link: '/home/index',
    component: Home,
    exact: true,
  }
]
