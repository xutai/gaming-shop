export function replaceImageUrl() {
    const images = document.querySelectorAll("img[class='game_image']")
        ; (async () => {
            for await (let image of images) {
                let steamId = image.dataset.steamId
                // console.info(
                //     steamId,
                //     typeof steamId
                // )
                if (steamId !== 'undefined' && steamId !== 'null' && steamId !== '') {
                    image.src = `https://media.st.dl.pinyuncloud.com/steam/apps/${steamId}/capsule_231x87.jpg`
                }
            }
        })()
}


