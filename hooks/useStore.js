'use client'
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"

// 辅助函数：用 Canvas 转换 Blob 为 JPG
async function convertToJpg(ipfsUrl) {
    // 1. 获取 IPFS 图片数据
    const response = await fetch(ipfsUrl);
    const blob = await response.blob();

    // 2. 用 Canvas 转换格式（可选，如果已经是 JPG/PNG 可跳过）
    const convertedBlob = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            // 转换为 JPG（或 PNG）
            canvas.toBlob(
                (resultBlob) => resolve(resultBlob),
                'image/jpeg', // 或 'image/png'
                0.9 // 质量参数（0-1）
            );
        };
        img.src = URL.createObjectURL(blob);
    });

    // 3. 生成临时 Object URL
    const objectUrl = URL.createObjectURL(convertedBlob);
    return objectUrl; // 返回可直接使用的 URL
}

export const useStore = create((set) => ({
    modal: true,
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
        console.log(url);
        let img;
        try {
            img = useLoader(TextureLoader, url)
            console.log(img);

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