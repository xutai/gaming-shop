// document.getElementById('editor').setAttribute('contenteditable', 'true')

import { windowOrWorkerGlobalScopeFetch } from '../api/fetch.mjs'

// linkElement()
restoreLocalStorage()
handleSubmit()

function linkElement() {
    const editor = document.getElementById('editor')
    const note = document.getElementById('note')
    try {
        editor.addEventListener('change', function (event) {
            note.value = event.target.value
            saveToLocalStorage()
        })
        note.addEventListener('change', function (event) {
            editor.value = event.target.value
            saveToLocalStorage()
        })
    } catch (e) {
        console.error(e)
    } finally { }
}


function referElById(id) {
    return document.getElementById(id)
}


function getRecord(type) {
    const _id = referElById('_id')
    const ename = referElById('ename')
    const cname = referElById('cname')
    const price = referElById('price')
    const save = referElById('save')
    const trainer = referElById('trainer')
    const guide = referElById('guide')
    const bilibili = referElById('bilibili')
    // const note = referElById('note')
    const editor = referElById('editor')
    const steamId = referElById('steamId')

    let record = {
        _id: _id.value,
        ename: ename.value || '',
        cname: cname.value || '',
        price: price.value || 0,
        save: save.value || '',
        trainer: trainer.value || '',
        guide: guide.value || '',
        bilibili: bilibili.value || '',
        note: encodeURIComponent(editor.value) || '',
        steamId: steamId.value || 0,
    }

    if (type === 'obj') {
        return record
    } else if (type === 'json') {
        return JSON.stringify(record)
    }
}

function saveToLocalStorage() {
    let record = getRecord('json')
    localStorage.setItem('update', record)
}


function restoreLocalStorage() {
    const _id = referElById('_id')
    const ename = referElById('ename')
    const cname = referElById('cname')
    const price = referElById('price')
    const save = referElById('save')
    const trainer = referElById('trainer')
    const guide = referElById('guide')
    const bilibili = referElById('bilibili')
    // const note = referElById('note')
    const editor = referElById('editor')
    const steamId = referElById('steamId')

    try {
        let record = localStorage.getItem('update')

        record = JSON.parse(record)

        _id.value = record._id
        ename.value = record.ename || ''
        cname.value = record.cname || ''
        price.value = record.price || 0
        save.value = record.save || ''
        trainer.value = record.trainer || ''
        guide.value = record.guide || ''
        bilibili.value = record.bilibili || ''
        steamId.value = record.steamId || 0
        // note.value = decodeURIComponent(record.note)
        editor.value = decodeURIComponent(record.note) || ''
    } catch (e) {
        throw new Error(e)
    }
}

function handleSubmit() {
    // const form = document.getElementById('form')
    const btn = document.getElementById('submit')
    btn.addEventListener('click', function (event) {
        // event.preventDefault()

        const editor = document.getElementById('editor')
        const note = document.getElementById('note')

        // document.getElementById('note').value = document.getElementById('editor').innerText

        // let editorValue = editor.value
        // editorValue = encodeURIComponent(editorValue)
        // note.value = encodedValue

        const record = getRecord('obj')
        console.info(
            "update.mjs",
            "record",
            record
        );
            // debugger;
        windowOrWorkerGlobalScopeFetch(
            `/update`,
            'PATCH',
            new Headers({
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }),
            // new URLSearchParams(`?_id=${_id}`)
            new URLSearchParams(record)
        )
            .then(() => {
                window.location.assign(`/`)
            })
            .catch(e => console.error(`bad luck, ${e}`))

    })
}






function setUrl() {
    // (not available in firefox)


    // https://developer.mozilla.org/en-US/docs/Web/API/Selection
    // Behavior of Selection API in terms of editing host focus changes
    // Note: The Selection API methods may only move focus to an editing host, not to other focusable elements (e.g., <a>).

    // console.log(item.toString())
    // get the cursor selection
    // user must select the text
    const selection = window.getSelection()
    // const selection = document.getSelection()
    console.log(selection, selection.toString())
    // window.alert(selection.toString())
    // document.execCommand('insertHTML', false, `&lt;a&gt; href &lt;a/&gt;`)
    document.execCommand('insertHTML', false, `<a href="">href</a>`)

}
