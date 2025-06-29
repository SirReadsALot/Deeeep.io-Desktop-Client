import React, { useEffect, useState } from "react";

import { exposed } from "../utils/injector";
import { checkUrl, loadPixiAsset } from "../utils/pixi";

// { "<url>": <PIXI.Texture> }
const cachedCustomTerrain = {};

async function swap(targetTerrain: number, customUrl: string) {
    const urlValid = await checkUrl(customUrl)
    if (!urlValid) return alert("Invalid URL")

    // Check if the given URL is a texture that has been loaded before
    let cached = cachedCustomTerrain[customUrl]
    if (!cached) {
        const texture = await loadPixiAsset("terrain", customUrl, false)
        cached = cachedCustomTerrain[customUrl] = texture
    }
    // The property in gameScene containing the terrains list has a mangled name
    // We need to figure out this mangled name first
    const mapObjects = exposed.game.gameScene[Object.keys(exposed.game.gameScene).find((key) => exposed.game.gameScene[key] && Object.hasOwn(exposed.game.gameScene[key], "terrains"))]
    if (!mapObjects) return

    for (const terrain of mapObjects.terrains) {
        if (terrain?.settings?.texture === targetTerrain && terrain?.shape?.fill?.texture) {
            // Clear the Graphics and redraw it
            try {
                // Create a backup of the points in the old shape
                // They are stored in this format: [x1, y1, x2, y2, x3, y3, etc...]
                const points = terrain.shape.geometry.graphicsData[0].shape.points
                terrain.shape.clear()
                // The "color" option here actually refers to the texture tint
                // #FFFFFF means no tint
                terrain.shape.beginTextureFill({
                    texture: cached,
                    color: "ffffff"
                })
                terrain.shape.moveTo(points.shift(), points.shift())
                while (points.length > 0) {
                    terrain.shape.lineTo(points.shift(), points.shift())
                }
                terrain.shape.closePath()
            } catch { }
        }
    }

    console.log(`[DDC Terrain Swapper] Terrain type ${targetTerrain} -> ${customUrl}`)
}

const terrains = {
    1: "terrain",
    2: "terrain_back",
    3: "coldterrain",
    4: "coldterrain_back",
    5: "deepterrain",
    6: "beach",
    7: "beach_underwater",
    8: "swamp_island",
    9: "glacier",
    10: "reef",
    11: "reef2",
    12: "cenote1",
    13: "chalk",
    14: "clay",
    15: "estuarysand",
    16: "limestone",
    17: "rustymetal",
    18: "shallowglacier",
    19: "volcanicsand",
}

let _targetTerrain = "";
let _customUrl = "";
export const TerrainSwapperUI = {
    Name: "Terrain Swapper",
    Content() {
        const [targetTerrain, setTargetTerrain] = useState("")
        const [customUrl, setCustomUrl] = useState("")

        useEffect(() => {
            _targetTerrain = targetTerrain
            _customUrl = customUrl
        }, [targetTerrain, customUrl])

        return (
            <div className="flex flex-col gap-2">
                <select className="ddc-input" value={targetTerrain} onChange={(e) => setTargetTerrain(e.target.value)}>
                    <option value="" disabled>Select a terrain</option>
                    {Object.entries(terrains).map(([id, name]) => (
                        <option key={id} value={id}>
                            {name}
                        </option>
                    ))}
                </select>
                <input className="ddc-input" type="text" placeholder="Custom URL" value={customUrl} onChange={(e) => setCustomUrl(e.target.value)} />
            </div>
        )
    },
    FooterButtons() {
        return (
            <>
                <button type="button" className="ddc-btn emerald" onClick={() => swap(Number.parseInt(_targetTerrain), _customUrl)}>Swap</button>
            </>
        )
    }
}
