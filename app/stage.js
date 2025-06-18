'use client'
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Ground } from "@/components/ground";
import { Player } from "@/components/player";
import { FPV } from "@/components/fpv";
import { Cubes } from '@/components/cubes';
import { TextureSelector } from "@/components/textureSelector";

export const Stage = () => {
    return (
        <div className="w-full h-full relative">
            <Canvas>
                {/* <Sky sunPosition={[100, 100, 20]} /> */}
                <ambientLight intensity={0.5} />
                <Physics>
                    <FPV />
                    <Player />
                    <Cubes />
                    <Ground />
                </Physics>
            </Canvas>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">+</div>
            <TextureSelector />
        </div>
    );
}