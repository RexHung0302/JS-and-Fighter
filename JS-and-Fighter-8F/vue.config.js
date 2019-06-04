module.exports = {
    publicPath: '/JS-and-Fighter/JS-and-Fighter-8F/dist/',
    configureWebpack: {
        performance: {
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        }
    }
};