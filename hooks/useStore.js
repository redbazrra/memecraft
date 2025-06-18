'use client'
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { useLoader } from "@react-three/fiber"
import { TextureLoader, NearestFilter, RepeatWrapping } from "three"

export const useStore = create((set) => ({
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
                    texture: prev.activeTexeureIndex
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
    // num: 1 || -1 不能简单的加减1, 和下标对不上.
    setActiveTextureIndex: (num) => {
        set((prev) => ({
            activeTextureIndex: prev.activeTextureIndex + num
        }))
    },
    setTextures: (textures) => {
        // 使用 set 方法更新那个数组, 就像 deepseek 做的一样.
        set((prev) => ({
            textures
        }))
    },
    addImage: (url) => {
        // 更新 texture 为 index, 这样在 cube.js 里就能 map 上去.
        const img = useLoader(TextureLoader, url)
    },
    removeImage: () => {

    }
}))