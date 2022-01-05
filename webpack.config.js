const { resolve } = require("path"); //с помощью resolve, путь можно будет указывать кусочками
const HtmlWebpackPlugin = require("html-webpack-plugin"); //ставим плагин HTML, тк это - стороннее    + команда npm install  - - save—dev html-webpack-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");// ставим плагин MiniCss  командаой: npm i -D mini-css-extract-plugin

module.exports = {
    mode: "development",  // ставим режим разработчика 

    entry: resolve(__dirname, "src", "index.js"),  //точка входа в проект 

    output: {
        filename: "main.bundle.js"  //название файла, куда положатся данные (в папкe dist)
    },

    module: { //свойства
        rules: [  // правила
            {
                test: /\.s[ca]ss$/,     //регулярка для sass,scss. если видит такое расширение, то
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] //будут применены следующие пакеты  (команда для установки: npm install -D style-loader css-loader sass-loader) + дополнительно npm install -D sass
            },
            {
                test:/\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "img-optimize-loader",
                        options: {
                            compress: {
                                mode: "high",
                                webp: true,
                                gifsicle: true,
                                disableOnDevelopment: false
                            }
                        }

                    }
                ]
            },
            {
                test: /\.(mp[3|4])$/i,
                use: [
                    "file-loader"
                ]
            }
        ]
    },

    plugins: [     //здесь, чтобы настроить работу HTML - ставим плагин   
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "src", "index.html") //+ указываем какой именно html взять за основу, путь
        }),
        new MiniCssExtractPlugin({ // здесь настройка плагина  MiniCss
            filename: "main.bundle.css"
        })
    ]

}