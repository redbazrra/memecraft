'use client'
import { usePlane } from "@react-three/cannon"
import { useStore } from "../hooks/useStore";
import { TextureLoader, NearestFilter, RepeatWrapping } from "three";
import { useLoader } from "@react-three/fiber";

export const Ground = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0.5, 0]
    }))

    const groundTexture = useLoader(TextureLoader, '/images/ground.jpg');
    groundTexture.magFilter = NearestFilter;
    groundTexture.wrapS = RepeatWrapping;
    groundTexture.wrapT = RepeatWrapping;
    groundTexture.repeat.set(100, 100)
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