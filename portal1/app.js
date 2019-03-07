import './index'
import React from 'react';
import ReactDOM from 'react-dom'
import { request } from './http/request'
const MOUNT_NODE = document.getElementById('root')
import loadScript from './src/utils/loadScript';
import Root from './src/route'
import navs  from './nav';

window.app.routes = (window.app.routes || []).concat(navs)

request('./out/config.json').then(res => {
  console.log('res', res);
  let jsList = []
  Object.keys(res).forEach(key => {
    if(res[key].js && Array.isArray(res[key].js)){
      jsList = jsList.concat(res[key].js)
    }
  })

  Promise.all(jsList.map(js => loadScript(js)))
  .then(() => {
    // 所有的js全部下载完并执行
    const render = () => {
      ReactDOM.render(<Root navs={window.app.routes} />, MOUNT_NODE)
    }
    
    render()

    if (module.hot) {
      module.hot.accept(Root, render)
    }

  })
});