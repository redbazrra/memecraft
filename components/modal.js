'use client'
import { useEffect, useState } from "react";
import { useStore } from "@/hooks/useStore"
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";


export const Modal = ({ display }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [ca, setCa] = useState('6Etyj7AjKg5YSSPfZdd2KiEh23M8PAAumNz8LMH6pump');
    const [loading, setLoading] = useState(false);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-Key': process.env.NEXT_PUBLIC_XAPIKey
        },
    };
    const fetchData = async () => {
        try {
            // 第一步：获取 token 信息
            const tokenResponse = await fetch(`https://solana-gateway.moralis.io/token/mainnet/${ca}/metadata`, options);
            if (!tokenResponse.ok) {
                throw new Error('Failed to fetch token data');
            }
            const tokenData = await tokenResponse.json();

            // 第二步：获取 metadata
            const metadataResponse = await fetch(tokenData.metaplex.metadataUri);
            if (!metadataResponse.ok) {
                throw new Error('Failed to fetch metadata');
            }
            const metadata = await metadataResponse.json();

            // 设置图片 URL
            setImageUrl(metadata.image);
        } catch (err) {
            return;
        } finally {
            setLoading(false);
        }
    };

    const getRes = async () => {
        if (ca.trim() === '') {
            return;
        } else {
            setLoading(true);
            await fetchData();
        }
    }

    const { toggleModal, addImage } = useStore();

    const addToCubeList = () => {
        addImage(imageUrl)
    }

    const onChange = (e) => {
        setCa(e.target.value.trim())
    }


    return (
        <>
            {display ? (
                <div className="absolute w-100 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                            <div className="flex items-center justify-between md:p-1 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h4 className=" font-semibold text-gray-900 dark:text-white">
                                    paste ca to search image.
                                </h4>
                                <button onClick={() => toggleModal()} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer" data-modal-hide="authentication-modal">
                                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <div className="space-y-4">
                                    <div className="flex gap-1">
                                        <input onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="ca" required />
                                        <div onClick={getRes} className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">search</div>
                                    </div>
                                    <div className=" flex justify-center content-center">
                                        {
                                            loading ? (<div className="text-white">loading... if not work, try another one</div>) : imageUrl ?
                                                (
                                                    <div>
                                                        <img
                                                            src={imageUrl}
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
                                    <div onClick={addToCubeList} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">add to cube list</div>
                                    {/* <div onClick={testCode} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">add to cube list</div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}