
import { whatIsThis } from './cookie/trashBin.mjs'
import { hasCookie } from './cookie/hasCookie.mjs'
import { getCookie } from './cookie/getCookie.mjs'
import { getCookieValue } from './cookie/getCookieValue.mjs'
import { getCookieArray } from './cookie/getCookieArray.mjs'
import { getCookieValueServer } from './cookie/getCookieValueServer.mjs'
import { getCookieArrayServer } from './cookie/getCookieArrayServer.mjs'
import { setACookie } from './cookie/setACookie.mjs'
import { resetCookie } from './cookie/resetCookie.mjs'
import { updateACookie } from './cookie/updateACookie.mjs'
import { updateCookie } from './cookie/updateCookie.mjs'

const cookieObj = {
    hasCookie,
    getCookieArray,
    getCookieValue,
    resetCookie,
    updateCookie,
    getCookieValueServer
}

export { cookieObj, getCookie, updateACookie, setACookie, getCookieValue }