const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = options => {
    return {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            publicPath: "http://localhost:3000/",
            uniqueName: "sample"
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: ['@babel/react', '@babel/env']
                            }
                        },
                    ],
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(svg|png|jpg|gif)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                            },
                        },
                    ],
                },

            ],
        },
        plugins: [
            new ModuleFederationPlugin({

                name: "sample",
                library: { type: "var", name: "sample" },
                filename: "remoteEntry.js",
                exposes: {
                    './web-components': './src/App.js',
                },

                shared: ["react", "react-dom"]
            })
        ],
        devServer: {
            host: '0.0.0.0',
            contentBase: "public",
            port: 3000,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
            }
        }
    }
}
