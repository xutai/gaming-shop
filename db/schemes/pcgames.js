const getObjectId = require('../getObjectId')
exports.findDoc = (query) => {

    let _id = '',
        objectId = '',
        filter = {},
        updateDocument = {},
        options = {};

    // _id = query.get('_id')
    // objectId =  getObjectId(_id)
    filter = {
        // _id: objectId
    }
    updateDocument = {
        // $set: {
            ename: query.get('ename'),
            // cname: query.get('cname'),
            // save: query.get('save'),
            // trainer: query.get('trainer'),
            // guide: query.get('guide'),
            // bilibili: query.get('bilibili'),
            // note: query.get('note'),
            // steamId: query.get('steamId')
        // }
    }
    options = {
        // upsert: false
    }

    return {
        filter,
        updateDocument,
        options
    }

}
exports.insertDoc = (query) => {
    return new Promise((resolve, reject) => {
        if (query.get('ename') === null) {
            throw new Error('query.ename should not be null!')
        }
        try {
            ; (async () => {
                let _id = '',
                    objectId = '',
                    filter = {},
                    updateDocument = {},
                    options = {};

                // _id = query.get('_id')
                // objectId = await getObjectId(_id)
                filter = {
                    // _id: objectId
                }
                updateDocument = {
                    // $set: {
                        ename: query.get('ename') || '',
                        cname: query.get('cname') || '',
                        save: query.get('save') || '',
                        price: query.get('price') || 0,
                        trainer: query.get('trainer') || '',
                        guide: query.get('guide') || '',
                        bilibili: query.get('bilibili') || '',
                        note: query.get('note') || '',
                        steamId: query.get('steamId') || 0
                    // }
                }
                options = {
                    upsert: false
                }

                resolve(
                    {
                        filter,
                        updateDocument,
                        options
                    }
                )
            })()
        } catch (e) {
            console.error(e)
        } finally { }
    })
}
exports.updateDoc = (query) => {
    return new Promise((resolve, reject) => {
        if (query.get('ename') === null) {
            throw new Error('query.ename should not be null!')
        }
        try {
            ; (async () => {
                let _id = '',
                    objectId = '',
                    filter = {},
                    updateDocument = {},
                    options = {};

                _id = query.get('_id')
                objectId = await getObjectId(_id)
                console.log(__filename, "objectId", objectId)
                filter = {
                    _id: objectId
                }
                updateDocument = {
                    $set: {
                        // _id: _id,
                        ename: query.get('ename'),
                        cname: query.get('cname'),
                        save: query.get('save'),
                        price: query.get('price'),
                        trainer: query.get('trainer'),
                        guide: query.get('guide'),
                        bilibili: query.get('bilibili'),
                        note: query.get('note'),
                        steamId: query.get('steamId')
                    },
                    // $setOnInsert: {
                    //     price: query.get('price'),
                    // }
                }
                options = {
                    upsert: false
                }

                resolve(
                    {
                        filter,
                        updateDocument,
                        options
                    }
                )
            })()
        } catch (e) {
            console.error(e)
        } finally { }
    })
}