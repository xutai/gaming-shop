// const getObjectId = require('../getObjectId')
exports.insertDoc = (query) => {
    if (query.get('username') === null) {
        throw new Error('query.ename should not be null!')
    }
    let loginToken = query.get('password')
    let updateDocument = {}
    updateDocument = {
        username: query.get('username') || '',
        email: query.get('email') || '',
        password: query.get('password') || '',
        timestamp: query.get('timestamp') || '',
        csrf: query.get('csrf') || '',
        loginToken: loginToken
        // loginToken: query.get('loginToken'),
    }
    return { updateDocument }
}
exports.findDoc = (query) => {
    if (query.get('username') === null) {
        throw new Error(`query.get('username') should not be null!`)
    }
    if (query.get('password')) {
        return {
            username: query.get('username') || '',
            password: query.get('password') || ''
        }
    } else {
        return {
            username: query.get('username') || '',
        }
    }
}
exports.updateDoc = (query) => {
    if (query.get('username') === null) {
        throw new Error('query.userename should not be null!')
    }

    let _id = '',
        objectId = '',
        filter = {},
        updateDocument = {},
        options = {},
        loginToken = query.get('password')

    // _id = query.get('_id')
    // objectId = await getObjectId(_id)
    filter = {
        // _id: objectId
        username: query.get('username'),
        password: query.get('password')
    }

    updateDocument = {
        $set: {
            // username: query.get('username') || '',
            // email: query.get('email') || '',
            // password: query.get('password') || '',
            timestamp: query.get('timestamp') || '',
            csrf: query.get('csrf') || '',
            loginToken: loginToken
            // loginToken: query.get('loginToken'),
        }
    }
    options = {
        upsert: false
    }

    return {
        filter,
        updateDocument,
        options
    }


}