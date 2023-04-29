let jsonURL = browser.runtime.getURL("/config/link_swap.json")
const links = JSON.parse(jsonURL)
let baseURL;
let customURL;
const petRegex = /https:\/\/cdn\.deeeep\.io\/custom\/pets/i;
const terrainRegex = /https:\/\/deeeep\.io\/mapmaker\/assets\/packs\/1\/textures\//i;


if (links.PET_originalURL.match(petRegex)) {
    baseURL = links.PET_originalURL
    customURL = links.PET_customURL
    } else {
        return 
}

function redirect(reqDetails) {
    console.log(`Redirecting ${reqDetails.url}`)
    if (reqDetails.url === customURL) {
        return;
    }
    return {
        redirectUrl: customURL
    }
}

browser.webRequest.onBeforeRequest.addListener(
    redirect,
    {urls:[baseURL], types:["image"]},
    ["blocking"]
)

/*
https://cdn.deeeep.io/custom/pets/stubbysquid.png
https://media.discordapp.net/attachments/1035856135187595347/1097944931127013496/ang.png?width=580&height=676
*/
