'use client'
import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber"

export const FPV = () => {
    const { camera, gl } = useThree();

    return (
        <PointerLockControls selector="canvas" args={[camera, gl.domElement]}></PointerLockControls>
    )
}