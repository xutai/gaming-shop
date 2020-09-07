console.log('to-save_game.js')

// closure
// Creating closures in loops: A common mistake

// 1st with closure problem

// function showHelp(help) {
//     document.getElementById('help').innerHTML = help;
// }
    
// function setupHelp() {
//     var helpText = [
//         {'id': "ename", 'help': "english name"},
//         {'id': "cname", 'help': "chinese name"},
//         {'id': "save", 'help': "gamesave"},
//         {'id': "trainer", 'help': "trainer you use"},
//         {'id': "guide", 'help': "guide you have"},
//         {'id': "bilibili", 'help': "saved to bilibili?"},
//         {'id': "note", 'help': "note?"}
//     ];

//     for(var i = 0; i < helpText.length; i++) {
//         var helpItem = helpText[i];
//         console.log(helpItem.id)
//         document.getElementById(helpItem.id).onfocus = function() {
//             console.log(helpItem.help)
//             showHelp(helpItem.help)
//         }
//     }
// }

// setupHelp()


// 2nd fix
function showHelp(help) {
    document.getElementById('help').innerHTML = help;
}

function makeHelpCallback(help) {
    // console.log(help)
    // showHelp(help)
    return function() {
        showHelp(help)
    }
}

function setupHelp() {
    var helpText = [
        {'id': "ename", 'help': "english name"},
        {'id': "cname", 'help': "chinese name"},
        {'id': "save", 'help': "gamesave"},
        {'id': "trainer", 'help': "trainer you use"},
        {'id': "guide", 'help': "guide you have"},
        {'id': "bilibili", 'help': "saved to bilibili?"},
        {'id': "note", 'help': "note?"}
    ];

    for(var i = 0; i < helpText.length; i++) {
        var helpItem = helpText[i];
        // console.log(helpItem.id)
        document.getElementById(helpItem.id).onfocus = makeHelpCallback(helpItem.help)
    }
}

setupHelp()