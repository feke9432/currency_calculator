module.exports = {
    proxy: {
        '/getList': {
            target: 'http://op.juhe.cn/onebox/exchange/list?key=fcfc3e8ec3786e71dd638de39e301d0b',
            changeOrigin: true,
            pathRewrite: {
                '^/getList': ''
            }
        },
        '/currency': {
            target: 'http://op.juhe.cn/onebox/exchange/currency',
            changeOrigin: true,
            pathRewrite: {
                '^/currency': ''
            }
        }
    }
}