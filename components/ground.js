'use client'
import { usePlane } from "@react-three/cannon"
import { useTextures } from "../hooks/useTextures";
import { useStore } from "../hooks/useStore";

export const Ground = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0.5, 0]
    }))

    const { groundTexture } = useTextures();

    const { addCube } = useStore()

    return (
        <mesh
            ref={ref}
            onClick={(e) => {
                e.stopPropagation();
                const [x, y, z] = Object.values(e.point)
                    .map(v => Math.ceil(v))
                addCube(x, y, z);
            }}
        >
            <planeGeometry attach='geometry' args={[100, 100]}></planeGeometry>
            <meshStandardMaterial attach='material' map={groundTexture}></meshStandardMaterial>
        </mesh>
    )
}