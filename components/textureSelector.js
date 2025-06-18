'use client'
import { useKeyboard } from "@/hooks/useKeyboard"
import { useStore } from "@/hooks/useStore";
import { useEffect, useState } from "react";

const images = {
    dirt: '/images/dirt.jpg',
    log: '/images/log.jpg',
    grass: '/images/grass.jpg',
    glass: '/images/glass.png',
    wood: '/images/wood.png',
    test: 'https://ipfs.io/ipfs/QmW3wtADmoDFomqMBVv1gKihVGTUBvGBqPwFzZSawbAvrq'
}

export const TextureSelector = () => {
    const { texture, setTexture } = useStore();


    const { dirt, log, grass, glass, wood, test } = useKeyboard();

    useEffect(() => {
        const textures = {
            dirt,
            log,
            grass,
            glass,
            wood,
            test
        }
        const pressedTexture = Object.entries(textures).find(([k, v]) => v)
        if (pressedTexture) {
            setTexture(pressedTexture[0]);
        }
    }, [setTexture, dirt, log, grass, glass, wood, test])

    return (
        <div className="absolute top-1/2 left-6 transform -translate-x-1/8 -translate-y-8 text-white">
            <div className="flex flex-col">
                {Object.entries(images).map(([k, src], index) => {
                    return (
                        <div className="flex gap-2" key={k}>
                            <div className="text-white">{index + 1}</div>
                            <img width={24} height={24} src={src} alt={k} />
                            <div className="text-red-400">
                                {texture === k ? '⬅' : ''}
                            </div>
                        </div>
                    )
                })}
                <div></div>
            </div>
        </div>
    )
}