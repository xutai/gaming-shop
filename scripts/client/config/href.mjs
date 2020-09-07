const serverConfig = {
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
                port: 8081
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
const href = serverConfig.href
const origin = href.origin
const auth = href.auth
const host = origin.host
const hostname = host.hostname
const port = host.port
const hostnameToExport =
    hostname.topLevelDomain
        ? `${hostname.secondLevelDomain}.${hostname.secondLevelDomain}`
        : hostname.secondLevelDomain
const hostToExport =
    port === '80'
        ? hostnameToExport
        : `${hostnameToExport}:${port}`
const authToExport = `${auth.username}:${auth.password}`
const hrefToExport =
    !auth.username || !auth.password
        ? `${origin.protocal}://${hostToExport}`
        : `${origin.protocal}://${authToExport}@${hostToExport}`


export { hrefToExport as href }