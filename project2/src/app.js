import navs from '$src/menu/nav'
let app = window.app = window.app || {}; 
if(window.app){
  app.routes = (app.routes || []).concat(navs)
}