import { href } from './config.mjs'
export const customHref = (type = 'relative') => {
    if (type === 'relative') {
        return ''
    } else if (type === 'absolute') {
        return `${href}/scripts/client`
    }
}


// import { customHref } from '../config/customHref.mjs'
// let href = customHref()
// href += '../'

// const hrefs = [
//     '/scripts/client/util/shopping_basket.mjs'
// ]

// this won't work
// from `${href}/other-part`
// or 
// from hrefs[0]
// this must not be a arbitrary value!