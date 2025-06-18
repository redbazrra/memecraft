'use client'
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Ground } from "@/components/ground";
import { Player } from "@/components/player";
import { FPV } from "@/components/fpv";
import { Cubes } from '@/components/cubes';
import { TextureSelector } from "@/components/textureSelector";
import { Initial } from "@/components/Initial";
import { useStore } from "@/hooks/useStore";
import { Modal } from "@/components/modal";
import { Suspense } from "react";

export const Stage = () => {
    const { modal } = useStore();
    const fallback = (f) => {
        console.log(f)
        return null;
    }
    return (
        <div className="w-full h-full relative">
            <Canvas className="bg-gray-900">
                <Suspense fallback={null}>
                    {/* <Sky sunPosition={[100, 100, 20]} /> */}
                    <ambientLight intensity={0.5} />
                    <Initial />
                    <Physics>
                        <Stars />
                        <FPV />
                        <Player />
                        <Cubes />
                        <Ground />
                    </Physics>
                </Suspense>
            </Canvas>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">+</div>
            <TextureSelector />
            <Modal display={modal} />
        </div >
    );
}