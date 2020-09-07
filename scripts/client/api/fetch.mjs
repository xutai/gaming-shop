export const windowOrWorkerGlobalScopeFetch = (resource, method, headers, body) => {
    return new Promise((resolve, reject) => {
        // style 1
        const fetchResponsePromise = fetch(
            // USVString or Request object
            resource,
            // init
            {
                method: method || 'GET',
                headers: headers || new Headers(),
                body: body || null,
                mode: 'cors',
                // credentials: omit,
                cache: 'default',
                redirect: 'follow',
                referrer: '',
                referrerPolicy: 'no-referrer-when-downgrade',
                // integrity: 'sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=',
                keepalive: true,
                signal: new AbortController().signal
            }
        )
            .then(
                response => {
                    ; (async () => {
                        resolve(
                            {
                                ok: response.ok,
                                status: await response.status,
                                text: await response.text(),
                            }
                        )
                    })()
                }
            )
            .catch(e => console.error(e))



        // style 2
        // fetch(url).then(function(response) {
        //     response.text().then(function(text) {
        //         snapshotPre.textContent = text;
        //     })
        // })


        // style 3
        // XMLHttpRequest

        // let request = new XMLHttpRequest();
        // request.open('GET', url);
        // request.responseType = 'text';

        // request.onload =  function() {
        //     snapshotPre.textContent = request.response;
        // }

        // request.send();
    })

}