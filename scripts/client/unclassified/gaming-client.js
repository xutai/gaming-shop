

// Function.prototype.call()

function games(ename, cname) {
    this.ename = ename
    this.cname = cname
}
games.prototype.greeting = function() {
    console.log(`you must like ${this.ename}`)
}
function pcgames(ename, cname, playerLevel) {
    games.call(this, ename, cname)
    this.platform = 'pc'
    this.playerLevel = playerLevel

}
function mobileGames(ename, cname) {
    games.call(this, ename, cname)
    this.platform = 'mobile'
}



console.log('-----------------------------------------')

console.log("Object.getOwnPropertyNames(games.prototype)", Object.getOwnPropertyNames(games.prototype))
console.log("Object.getOwnPropertyNames(pcgames.prototype)", Object.getOwnPropertyNames(pcgames.prototype))
console.log("games.prototype.greeting", games.prototype.greeting)
console.log("pcgames.prototype.greeting", pcgames.prototype.greeting)
// console.log("beyondBlue.greeting()", beyondBlue.greeting()) 
// undefined

console.log('-----------------------------------------')

console.log("games.prototype.constructor",games.prototype.constructor)
// function games(ename, cname)
console.log("pcgames.prototype.constructor",pcgames.prototype.constructor)
// function pcgames(ename, cname)
console.log("games.prototype.constructor",games.prototype.constructor)
// function games(ename, cname)
console.log("pcgames.prototype.constructor",pcgames.prototype.constructor)
// function games(ename, cname)
pcgames.prototype = Object.create(games.prototype)
console.log("games.prototype.constructor",games.prototype.constructor)
// function games(ename, cname)
console.log("pcgames.prototype.constructor",pcgames.prototype.constructor)
// function games(ename, cname)
console.log("games.prototype.constructor",games.prototype.constructor)
// function games(ename, cname)
console.log("pcgames.prototype.constructor",pcgames.prototype.constructor)
// function games(ename, cname)

console.log('-----------------------------------------')

console.log("Object.getOwnPropertyNames(games.prototype)", Object.getOwnPropertyNames(games.prototype))
console.log("Object.getOwnPropertyNames(pcgames.prototype)", Object.getOwnPropertyNames(pcgames.prototype))
console.log("games.prototype.greeting", games.prototype.greeting)
console.log("pcgames.prototype.greeting", pcgames.prototype.greeting)


console.log('-----------------------------------------')


Object.defineProperty(pcgames.prototype, 'constructor', {
    value: pcgames,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true
})
console.log("games.prototype.constructor",games.prototype.constructor)
// function games(ename, cname)
console.log("pcgames.prototype.constructor",pcgames.prototype.constructor)
// function pcgames(ename, cname)



console.log('-----------------------------------------')

pcgames.prototype.greeting = function() {
    let rank;
    
    if (this.playerLevel === 1 || this.playerLevel === 2) {
        rank = 'rookie'
    } else if (this.playerLevel === 3) {
        rank = 'junior'
    } else {
        rank = 'master'
    }
    
    console.log(`${rank}, you must like ${this.ename}`)
}

const beyondBlue = new pcgames('beyond blue', '超越深蓝', 10)
const mlbb = new mobileGames('mlbb', '无尽对决')
console.log(beyondBlue, mlbb)
beyondBlue.greeting()
// you must like beyond blue
// master, you must like beyond blue


console.log('-----------------------------------------')


