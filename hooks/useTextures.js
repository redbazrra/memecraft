import { useLoader } from "@react-three/fiber"
import { TextureLoader, NearestFilter, RepeatWrapping } from "three"

export const useTextures = () => {
    const dirtTexture = useLoader(TextureLoader, '/images/dirt.jpg')
    const logTexture = useLoader(TextureLoader, '/images/log.jpg')
    const grassTexture = useLoader(TextureLoader, '/images/grass.jpg')
    const glassTexture = useLoader(TextureLoader, '/images/glass.png')
    const woodTexture = useLoader(TextureLoader, '/images/wood.png')
    const groundTexture = useLoader(TextureLoader, '/images/ground.jpg');

    const testTexture = useLoader(TextureLoader, 'https://ipfs.io/ipfs/QmW3wtADmoDFomqMBVv1gKihVGTUBvGBqPwFzZSawbAvrq')


    dirtTexture.magFilter = NearestFilter;
    logTexture.magFilter = NearestFilter;

    grassTexture.magFilter = NearestFilter;

    glassTexture.magFilter = NearestFilter;
    woodTexture.magFilter = NearestFilter;

    groundTexture.magFilter = NearestFilter;
    groundTexture.wrapS = RepeatWrapping;
    groundTexture.wrapT = RepeatWrapping;
    groundTexture.repeat.set(100, 100)

    return {
        dirtTexture,
        logTexture,
        grassTexture,
        glassTexture,
        woodTexture,
        groundTexture,
        testTexture
    }
}