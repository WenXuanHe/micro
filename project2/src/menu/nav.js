import React from 'react'
import Loadable from 'react-loadable'

export const asyncLoadable = (loader) => {
  return Loadable({ loader: loader, loading: () => <div>loading</div> })
}
let namespace = 'project2';

function wrapper(loadComponent, namespace) {
  if(window.app && window.app.wrapper){
    return window.app.wrapper(loadComponent, namespace)
  }else{
    return asyncLoadable(loadComponent)
  }
}

export default [ 
  {
    name: 'project2',
    link: '/project2/index',
    component: wrapper(() => import(/* webpackPrefetch: true */ '$src/pages/home/index'), namespace),
    exact: true,
  }
]
