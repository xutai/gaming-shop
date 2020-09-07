module.exports = function buildHtml(header, body, footer, useWrapper) {
    'use strict'

    header = header || ''
    body = body || ''
    footer = footer || ''

    body += `
    <script>
    </script>
    `

    if (useWrapper) {
        return `
        <!DOCTYPE html>
        <html>
        ${header}
        ${body}
        ${footer}
        </html>
        `
    } else {
        return `
        ${header}
        ${body}
        ${footer}
        `
    }
}