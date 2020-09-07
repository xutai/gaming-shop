import { windowOrWorkerGlobalScopeFetch } from './api/fetch.mjs'

const toDeleteButtons = document.querySelectorAll('.toDelete')
const toEditButtons = document.querySelectorAll('.toEdit')

for (let i = toDeleteButtons.length; i > 0; i--) {
    let _id = toDeleteButtons[i - 1].getAttribute('data-_id')
    toDeleteButtons[i - 1].addEventListener('click', toDeleteCallback(_id))
    if (toEditButtons.length)
        toEditButtons[i - 1].addEventListener('click', toEditCallback(_id))
}

function toEditCallback(_id) {
    return function () {
        toEdit(_id)
    }
}
function toEdit(_id) {
    // window.location.assign(`/update?_id=${_id}`)
    windowOrWorkerGlobalScopeFetch(
        `/update?_id=${_id}`,
        'GET',
        // new Headers({
        //     // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        // }),
        // new URLSearchParams(`?_id=${_id}`)
    )
        .then(result => {
            result = result.text
            result = JSON.parse(result)
            result = JSON.stringify(result.record)
            localStorage.setItem('update', result)
        })
        .then(() => {
            window.location.assign(`/update`)
        })
        .catch(e => console.error(`bad luck, ${e}`))
}


function toDelete(_id) {
    const isConfirm = window.confirm('are you sure to delete this item?')
    if (isConfirm === true) {
        windowOrWorkerGlobalScopeFetch(
            `/delete?_id=${_id}`,
            'DELETE',
            new Headers({
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }),
            // new URLSearchParams(`?_id=${_id}`)
            )
            .then(result => { 
                console.info(result) 
                // window.location.assign(`/delete?_id=\${_id}`)
                window.location.assign(`/`)
            })
            .catch(e => console.error(`bad luck, ${e}`))
    }
}

function toDeleteCallback(_id) {
    return function () {
        toDelete(_id)
    }
}


import { replaceImageUrl } from './replaceImageUrl.mjs'
replaceImageUrl()



