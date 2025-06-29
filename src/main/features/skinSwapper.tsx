import React, { useEffect, useState } from "react";

import { exposed } from "../utils/injector";


async function swap(skinId: number) {
    for (const animal of exposed.game.gameScene.myAnimals) {
        animal.setSkin(skinId)
    }
}

let _skinId = "";
export const SkinSwapperUI = {
    Name: "Skin Swapper",
    Content() {
        const [skinId, setSkinId] = useState("")

        useEffect(() => {
            _skinId = skinId
        }, [skinId])

        return (
            <div className="flex flex-col gap-2">
                <input className="ddc-input" type="text" placeholder="Skin ID" value={skinId} onChange={(e) => setSkinId(e.target.value)} />
            </div>
        )
    },
    FooterButtons() {
        return (
            <>
                <button
                    type="button"
                    className="ddc-btn emerald"
                    onClick={() => {
                        swap(Number.parseInt(_skinId))
                    }}
                >Swap</button>
            </>
        )
    }
}
