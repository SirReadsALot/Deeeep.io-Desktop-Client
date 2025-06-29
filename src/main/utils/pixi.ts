import { exposed } from "../utils/injector";

function randomIdentifier(length = 8) {
    // Create an array of random numbers
    let randValues = crypto.getRandomValues(new Uint8Array(length))
    // We only want the 4 smallest bit of the number (0 - 15)
    randValues = randValues.map((n) => n & 0b1111)
    // Convert all the numbers to a hexadecimal digit (0 - f)
    return Array.from(randValues).map((n) => n.toString(16)).join("")
}

export async function loadPixiAsset(type: "pet" | "terrain", url: string, returnAsAlias = true) {
    // Generate a "unique" identifier for each asset
    // This will be internally managed by the swapper
    const id = randomIdentifier();
    const assetName = `${type}_${id}.png`;
    const texture = await exposed.PixiAssets.load({
        alias: [assetName],
        src: url,
        data: {
            ignoreMultiPack: true,
        },
    });
    if (returnAsAlias) {
        return type === "pet" ? `${id}.png` : assetName;
    }
    return texture;
}

// https://pixijs.download/v7.2.4/docs/PIXI.Assets.html
const allowedContentTypes = ["avif", "webp", "apng", "png", "jpeg", "gif", "svg+xml"].map((type) => `image/${type}`)
export async function checkUrl(url: string) {
    const response = await fetch(url, {
        method: 'HEAD'
    });
    const contentType = response.headers.get("Content-Type");
    return allowedContentTypes.includes(contentType)
};