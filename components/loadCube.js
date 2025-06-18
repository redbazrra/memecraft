'use client'

import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"

export const LoadCube = ({ loading, imgUrl }) => {
    try {
        const texture = useLoader(TextureLoader, imgUrl ? imgUrl : '');
    } catch (e) {

    }
    return (
        <div className=" flex justify-center content-center">
            {
                loading ? (<div className="text-white">loading... if not work, try another one</div>) : imgUrl ?
                    (
                        <div>
                            <img
                                src={imgUrl}
                                alt="Token image"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Available';
                                }}
                            />

                        </div>
                    ) : (
                        <div className="">
                            <p className="text-gray-500">No image available</p>
                        </div>
                    )}
        </div>
    )
}