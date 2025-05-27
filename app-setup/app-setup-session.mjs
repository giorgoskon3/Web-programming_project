const sessionMiddleware = {
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 60 // 1 hour
    },
    resave: false,
    saveUninitialized: false
}

export default sessionMiddleware;
