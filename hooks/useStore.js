'use client'
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"

export const useStore = create((set) => ({
    modal: false,
    activeTexture: 'dirt',
    activeTextureIndex: 0,
    textures: [],
    images: [
        '/images/dirt.jpg',
        '/images/log.jpg',
        '/images/grass.jpg',
        '/images/glass.png',
        '/images/wood.png',
    ],
    cubes: [],
    addCube: (x, y, z) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.activeTextureIndex
                }
            ]
        }))
    },
    removeCube: (x, y, z) => {
        set((prev) => ({
            cubes: prev.cubes.filter(cube => {
                const [X, Y, Z] = cube.pos;
                return X !== x || Y !== y || Z !== z;
            })
        }))
    },
    setActiveTexture: (activeTexture) => {
        set(() => ({
            activeTexture
        }))
    },
    setActiveTextureIndex: (num) => {
        set((prev) => ({
            activeTextureIndex: prev.activeTextureIndex + num
        }))
    },
    setTextures: (textures) => {
        set(() => ({
            textures
        }))
    },
    addImage: async (url) => {
        let img;
        try {
            img = useLoader(TextureLoader, url)
        } catch (e) {
            console.log(e);
        } finally {
            if (img) {

                set((prev) => ({
                    textures: [
                        ...prev.textures,
                        img
                    ],
                    images: [
                        ...prev.images,
                        url
                    ]
                }))
            }
        }
    },
    removeImage: () => {

    },
    toggleModal: () => {
        set((prev) => ({
            modal: !prev.modal
        }))
    }
}))