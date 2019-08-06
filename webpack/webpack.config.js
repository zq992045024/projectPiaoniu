const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const PATH = {
    dev:path.join(__dirname,"./src/main.js"),
    build:path.join(__dirname,"./dist")
}

module.exports = {
    mode:'development',
    //入口配置
    entry:{
        app:PATH.dev
    },
    //出口配置
    output:{
        filename:"[name].js",
        path:PATH.build
    },
    module:{
        //规则
        rules:[
            {
                test:/\.(js)$/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["@babel/env"]
                    }
                }
            },
            {
                test:/\.(css|scss)$/,
                //css loader执行的顺序  从右到左 从下到上
                use:["style-loader","css-loader","sass-loader"]
            },
            {   
                /*
                    当图片的大小小于2048的时候用url-loader做解析  
                    大于2048的时候用file-loader做解析 系统会自动去找file-loader

                    url-loader:解析的时候会解析成base64的形式
                    file-loader会解析成原本的形式
                */
                test:/\.(jpg|png|gif)$/,
                use:{
                    loader:"url-loader",
                    options:{
                        limit:2048
                    }
                }
            },
            {
                test:/\.(woff|svg|eot|ttf|woff2)$/,
                use:["url-loader"]
            },
            {
                test:/\.vue$/,
                loader:"vue-loader"
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:"index.html",
            template:"index.html",
            title:"Vue"
        }),
        new VueLoaderPlugin()
    ],
    devServer:{
        open:true
    }
}

//http://m.maoyan.com/ajax/movieOnInfoList?token=