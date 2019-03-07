const fs = require('fs');

module.exports = class ServiceUpdatePlugin {
  constructor(options) {
    this.options = options;
    this.runCount = 0;
  }

  // 更新线上配置文件
  uploadOnlineConfig({srcs, output}) {
    console.log('更新线上配置文件', srcs);
    let config = JSON.stringify({
      [this.options.app_name]: {
        js: srcs
      }
    })
    fs.writeFile(__dirname + `/${this.options.app_name}-config.json`, config + "\n")
    fs.writeFile(output + `/${this.options.app_name}-config.json`, config  + "\n")
  }

  apply(compiler) {
    // 调试环境：编译完毕，修改本地文件
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    
    if(process.env.NODE_ENV === 'production') {
      // 本地调试没有md5值，不需要每次刷新
      compiler.hooks.done.tap('ServiceUpdatePlugin', (stats) => {
        if(this.runCount > 0) {
          return;
        }
        let assets = stats.compilation.assets;
        
        let publicPath = stats.compilation.options.output.publicPath;
        console.log('publicPath', publicPath);
        console.log('output', stats.compilation.options.output.path);

        let js = Object.keys(assets).filter(item => {
          console.log('item', item);
          // 过滤入口文件
          return item.endsWith('.js') && /entry\..*\.js/.test(item);
        }).map(path => `${publicPath}${path}`);

        this.uploadOnlineConfig({srcs: js, output: stats.compilation.options.output.path});
        this.runCount++;
      });
    }
    // // 发布环境：上传完毕，请求后端修改
    // else {
    //   compiler.hooks.uploaded.tap('ServiceUpdatePlugin', (upFiles) => {
    //     console.log('upFiles', upFiles);

    //     let entries = upFiles.filter(file => {
    //       return file &&
    //         file.endsWith('js') &&
    //         file.includes('js/');
    //     });

    //     this.uploadOnlineConfig({files: entries});
    //     return;
    //   })

    // }
  }
}