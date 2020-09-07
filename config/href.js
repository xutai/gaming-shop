// ip省略的话应该是127.0.0.1即本机
module.exports = {
    host: 'http://localhost',
    port: 8082,
    href: {
        auth: {
            username: '',
            password: ''
        },
        origin: {
            protocal: 'http',
            host: {
                hostname: {
                    topLevelDomain: '',
                    secondLevelDomain: 'localhost',
                },
                ip: '127.0.0.1',
                port: 8082
            },
        },
        path: {
            pathname: '',
            search: {
                query: ''
            }
        },
        hash: ''
    }

}