module.exports = {
    publicPath: '/JS-and-Fighter/JS-and-Fighter-8F/dist/',
    configureWebpack: {
        performance: {
            maxEntrypointSize: 5120000,
            maxAssetSize: 5120000,
        }
    }
};