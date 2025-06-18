import { useStore } from "@/hooks/useStore";
import { useTextures } from "@/hooks/useTextures";

export const Initial = () => {
    const initialTextures = useTextures();
    const { textures, setTextures } = useStore();
    if (textures.length === 0) {
        setTextures(initialTextures);
    }
    return null;
}