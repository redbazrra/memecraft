'use client'
import { useStore } from "../hooks/useStore";
import { Cube } from './cube'

export const Cubes = () => {

    const { cubes } = useStore()
    return cubes.map(({ key, pos, texture }, index) => {
        return (
            <Cube key={key} position={pos} texture={index}></Cube>
        )
    })
}