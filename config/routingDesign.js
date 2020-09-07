exports.routes = {
    home: '/',
    user: {
        login: '/login',
        join: '/join',
    },
    crud: {
        create: '/create',
        update: '/update',
        read: '/read',
        delete: '/delete'
    },
    assets: [
        { icon: '/favicon.ico' },
        'scripts',
        'styles',
        'images'
    ],
    db: '',
    api: {
        records: {
            route: '/records',
            file: 'records_get',
            query: {}
        }
    }
}

exports.routesPathname = {
    home: ['/', 'index.html'],
    login: ['/login', '/login.html'],
    join: ['/join', '/join.html'],
    create: ['/create', '/pages/crud/create.html'],
    read: ['/read', '/pages/crud/read.html'],
    update: ['/update', '/pages/crud/update.html'],
    delete: ['/delete', '/pages/crud/delete.html'],
    assets: [
        { icon: '/favicon.ico' },
        'scripts',
        'styles',
        'images'
    ],
    db: ''
}

exports.routing = [
    {
        routes: ['login', 'join'],
        checkAccessPermissions: false,
        checkLoginToken: true,
        loginTokenVerified: {
            yes: {
                redirectTo: '/'
            },
            no: {}
        }
    },
    {
        routes: '/',
        checkAccessPermissions: false,
        checkLoginToken: true,
        loginTokenVerified: {
            yes: {},
            no: {
                redirectTo: '/login'
            }
        }

    },
    {
        routes: 'others',
        checkAccessPermissions: true,
        hasAccessPermissions: {
            yes: {},
            no: {
                forbidden: true,
                whitelistRoutes: ['/', '/login', '/join']
            }
        },
        checkLoginToken: true,
        loginTokenVerified: {
            yes: {},
            no: {
                redirectTo: '/login'
            }
        }

    }
]
exports.checkAccessPermissions = {
    checkPermissionCookie: {
        yes: 'allow to preceed',
        no: {
            ignoredRoutes: ['login', 'join'],
            unauthorizedRoutes: 'all routes expect above',
            checkCredentials: {
                routes: 'all requests',
                isVerified: {
                    yes: {
                        redirectRoutes: {
                            login: '/',
                            join: '/',
                        }
                    },
                    no: {
                        redirectRoutes: {
                            no: ['login', 'join'],
                            yes: {
                                routes: 'all except above',
                                to: '/login'
                            }
                        }
                    }
                }
            }

        }
    }

}