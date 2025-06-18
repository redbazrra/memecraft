'use client'
import { useStore } from "@/hooks/useStore";
import { useBox } from "@react-three/cannon";

export const Cube = ({ position, texture }) => {
    const [ref] = useBox(() => ({ mass: 0, position }))

    const { textures, addCube, removeCube } = useStore();

    const activeTexture = textures[texture];

    return (
        <mesh
            ref={ref}
            onClick={(e) => {
                e.stopPropagation();
                const clickedFace = Math.floor(e.faceIndex / 2);
                const { x, y, z } = ref.current.position;

                if (e.altKey) {
                    removeCube(x, y, z);
                    return;
                }

                if (clickedFace === 0) {
                    addCube(x + 1, y, z);
                    return;
                } else if (clickedFace === 1) {

                    addCube(x - 1, y, z);
                    return;
                } else if (clickedFace === 2) {

                    addCube(x, y + 1, z);
                    return;
                } else if (clickedFace === 3) {

                    addCube(x, y - 1, z);
                    return;
                } else if (clickedFace === 4) {

                    addCube(x, y, z + 1);
                    return;
                } else if (clickedFace === 5) {

                    addCube(x, y, z - 1);
                    return;
                }
            }}
        >
            <boxGeometry attach='geometry' args={[1, 1, 1]} />
            <meshStandardMaterial attach='material' map={activeTexture} />
        </mesh>
    )
}