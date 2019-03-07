// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const libs = ['react', 'react-dom'];
const postcss = require('postcss')

var babelOpts = {
    cacheDirectory: true,
    presets: [
        ["env", {
            "targets": {
                "browsers": ["last 2 versions", "safari >= 7"]
            },
            // 开启tree shaking
            "modules": false,
            "loose": true
        }]
        , "es2015", 'react', 'stage-0'],
    plugins: [
        ["transform-runtime", {
            "polyfill": false,
            "regenerator": true
        }],
        'transform-decorators-legacy'
    ]
}

module.exports = {
    mode: 'development',
    entry: {
        'root': path.resolve(__dirname, './app.js'),
    },
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        path: path.resolve(__dirname, '../', 'out'),
    },
    module: {
        rules: [
            {
                // Webpack style loader added so we can use materialize
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'sugarss',
                            plugins: [
                                require('autoprefixer')(),
                                postcss.plugin('namespace', () => css =>
                                    css.walkRules(rule => {
                                        if (rule.parent && rule.parent.type === 'atrule' && rule.parent.name !== 'media') return;
                                        rule.selectors = rule.selectors.map(s => `.namespace-kaoqin ${s === 'body' ? '' : s}`);
                                    })
                                )()
                            ],
                            exec: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                use: [{
                    loader: 'babel-loader',
                    options: babelOpts
                }],
            },
            {
                // This plugin will allow us to use html templates when we get to the angularJS app
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader',
            },
        ],
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        alias: {
            $src: path.resolve(__dirname, 'src'),
            $pages: path.resolve(__dirname, 'src/pages')
        },
        modules: [
            __dirname,
            'node_modules',
        ],
    },
    plugins: [
        // A webpack plugin to remove/clean the build folder(s) before building
        new CleanWebpackPlugin(['dist']),
    ],
    devtool: 'source-map',
    externals: [
        function (context, request, callback) {
            if (libs.indexOf(request.split('/', 1)[0]) !== -1) {
                //如果文件的require路径中包含libs中的 替换为 window.app.require('${request}'); 
                //var在这儿是声明的意思 
                callback(null, `var window.app.require('${request}')`);
            } else {
                callback();
            }
        }
    ],
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/motor/front_mis/*': {
                target: 'http://admin.bytedance.com',
                secure: false,
                changeOrigin: true
            },
            '/motor/tag/upload/*': {
                target: 'http://admin.bytedance.com',
                secure: false,
                changeOrigin: true
            }
        }
    }
};