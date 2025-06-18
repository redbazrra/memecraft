import { useLoader } from "@react-three/fiber"
import { TextureLoader, NearestFilter } from "three"

export const useTextures = () => {
    const temp = []
    const dirtTexture = useLoader(TextureLoader, '/images/dirt.jpg')
    const logTexture = useLoader(TextureLoader, '/images/log.jpg')
    const grassTexture = useLoader(TextureLoader, '/images/grass.jpg')
    const glassTexture = useLoader(TextureLoader, '/images/glass.png')
    const woodTexture = useLoader(TextureLoader, '/images/wood.png')

    dirtTexture.magFilter = NearestFilter;
    logTexture.magFilter = NearestFilter;

    grassTexture.magFilter = NearestFilter;

    glassTexture.magFilter = NearestFilter;
    woodTexture.magFilter = NearestFilter;

    temp.push(dirtTexture);
    temp.push(logTexture);
    temp.push(grassTexture);
    temp.push(glassTexture);
    temp.push(woodTexture);

    return temp;
}