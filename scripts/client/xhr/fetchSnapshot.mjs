import { href } from '../config/href.mjs'

export default function () {
    // snapshot
    const snapshotSelect = document.querySelector('.snapshot-select') || null
    const snapshotPre = document.querySelector('.snapshot-pre') || null

    if (snapshotSelect === null || snapshotPre === null) return 

    snapshotSelect.onchange = function () {
        const selectValue = snapshotSelect.value;
        updateDisplay(selectValue);
    }

    function updateDisplay(value) {
        value = value.replace(" ", "");
        value = value.toLowerCase();
        // let url = '/storage/' + value + '.txt';
        let url = `${href}/storage/${value}.txt`;


        // different style
        fetch(url).then(function (response) {
            return response.text()
        }).then(function (text) {
            snapshotPre.textContent = text;
        })

    }

    updateDisplay('gamelist');
    snapshotSelect.value = 'gamelist'
}