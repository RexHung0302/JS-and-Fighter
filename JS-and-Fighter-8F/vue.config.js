module.exports = {
    publicPath: '/JS-and-Fighter/JS-and-Fighter-8F/dist/',
    configureWebpack: {
        performance: {
            maxEntrypointSize: 50000000,
            maxAssetSize: 30000000,
            assetFilter: function(assetFilename) {
                // 提供资源文件名的断言函数
                return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
            }
        }
    }
};