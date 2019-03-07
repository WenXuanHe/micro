let app = window.app = {};

/**
* 重新定义包
* @param name  引用的包名，例如 react
* @param context 资源引用器 实际上是 webpackContext（是一个方法，来引用资源文件）
* @param index 定义的包的入口文件
*/
app.define = function (name, context, index) {
  let keys = context.keys();
  for (let key of keys) {
    let parts = (name + key.slice(1)).split('/');
    let dir = this.modules = this.modules || {};
    for (let i = 0; i < parts.length - 1; i++) {
      let part = parts[i];
      if (!dir.hasOwnProperty(part)) {
        dir[part] = {};
      }
      dir = dir[part];
    }
    dir[parts[parts.length - 1]] = context.bind(context, key);
  }
  if (index != null) {
    this.modules[name]['index.js'] = this.modules[name][index];
  }
};

app.require = function(name){
  console.log('require', name);
  if(this.modules[name]){
    let res = this.modules[name]['index.js'] ? this.modules[name]['index.js']  : this.modules[name]
    console.log(res);
    return res()
  }else{
    null
  }
}

//定义app的react 
//定义一个react资源库：把原来react根目录和lib目录下的.js全部获取到，绑定到新定义的react中，并指定react.js作为入口文件
app.define('react', require.context('react', true, /^.\/(lib\/)?[^\/]+\.js$/), 'index.js');
app.define('react-dom', require.context('react-dom', true, /^.\/index\.js$/));

app.wrapper = function wrapper(loadComponent, namespace) {
  let React = require('react');
  return class LoaderAsync extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        component: null
      }
    }

    componentWillMount() {
      if (!this.state.component) {
        loadComponent().then(component => {
          this.setState({
            component: component.default
          })
        })
      }
    }

    render(){
      let MyComponent = this.state.component ? this.state.component : () => <div></div>
      return  <div className={`namespace-${namespace}`}>
          <MyComponent />
      </div>
    }
  }
}