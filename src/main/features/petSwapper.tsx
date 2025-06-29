import React, { useEffect, useState } from "react";

import { exposed } from "../utils/injector";
import { checkUrl, loadPixiAsset } from "../utils/pixi";

// { "<url>": "<asset alias>" }
const cachedCustomPets = {};

async function swap(targetPet: string, customUrl: string) {
    const urlValid = await checkUrl(customUrl)
    if (!urlValid) return alert("Invalid URL")

    // Check if the given URL is a texture that has been loaded before
    let cached = cachedCustomPets[customUrl]
    if (!cached) {
        const textureAlias = await loadPixiAsset("pet", customUrl, true)
        cached = cachedCustomPets[customUrl] = textureAlias
    }
    // The property in gameScene containing the entities list has a mangled name
    // We need to figure out this mangled name first
    const objectsManager = exposed.game.gameScene[Object.keys(exposed.game.gameScene).find((key) => exposed.game.gameScene[key] && Object.hasOwn(exposed.game.gameScene[key], "entitiesList")) as string]
    if (!objectsManager) return

    for (const entity of objectsManager.entitiesList) {
        if (entity?.petData?.asset === targetPet) {
            // Update the asset name
            // Deeeep.io will auto-prefix the asset name with "pet_"
            // e.g. "fish.png" -> "pet_fish.png"
            // When loading assets, we have to alias them as "pet_name.png"
            // But when setting petData.asset, we have to use "name.png"
            entity.petData.asset = cached
            entity.updateTexture()
        }
    }

    console.log(`[DDC Pet Swapper] ${targetPet} -> ${customUrl}`)
}

let _targetPet = "";
let _customUrl = "";
export const PetSwapperUI = {
    Name: "Pet Swapper",
    Content() {
        const [targetPet, setTargetPet] = useState("")
        const [customUrl, setCustomUrl] = useState("")

        const [pets, setPets] = useState<{
            "id": number,
            "user_id": number | null,
            "name": string,
            "cost": number,
            "asset": number,
            "on_sale": boolean,
            "usable": boolean,
            "sales": number,
            "created_at": string,
            "updated_at": string
        }[]>([])

        useEffect(() => {
            _targetPet = targetPet
            _customUrl = customUrl
        }, [targetPet, customUrl])

        useEffect(() => {
            fetch("https://api.deeeep.io/pets")
                .then((res) => res.json())
                .then((json) => setPets(json))
        }, [])

        return (
            <div className="flex flex-col gap-2">
                <select className="ddc-input" value={targetPet} onChange={(e) => setTargetPet(e.target.value)}>
                    <option value="" disabled>Select a pet</option>
                    {pets.map((pet) => (
                        <option key={pet.name} value={pet.asset}>
                            {pet.name}
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
                <button type="button" className="ddc-btn emerald" onClick={() => swap(_targetPet, _customUrl)}>Swap</button>
            </>
        )
    }
}
