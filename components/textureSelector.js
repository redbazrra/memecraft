'use client'
import { useKeyboard } from "@/hooks/useKeyboard"
import { useStore } from "@/hooks/useStore";
import { useEffect } from "react";

export const TextureSelector = () => {
    const { activeTextureIndex, setActiveTexture, setActiveTextureIndex, textures, images, modal, toggleModal } = useStore();

    const { up, down } = useKeyboard();

    useEffect(() => {
        if (up) {
            if (activeTextureIndex === 0) {
                return;
            } else {
                setActiveTextureIndex(-1);
            }
        }
        if (down) {
            if (activeTextureIndex >= textures.length - 1) {
                return;
            } else {
                setActiveTextureIndex(1);
            }
        }
    }, [setActiveTexture, up, down])

    return (
        <div className="absolute top-1/6 left-6 transform -translate-x-1/8 -translate-y-8 text-white">
            <div className="flex flex-col gap-0.5">
                {images.map((src, index) => {
                    return (
                        <div className="flex gap-2" key={index}>
                            {/* <div className="text-white">{index + 1}</div> */}
                            <img width={24} height={24} src={src} alt=' ' />
                            <div className="text-red-400">
                                {activeTextureIndex === index ? '⬅' : ''}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="mt-2 border border-dashed border-gray-600 flex content-center justify-center cursor-pointer" style={{ width: '25px' }} onClick={() => toggleModal()}> + </div>
        </div>
    )
}