import { useSelector } from "react-redux"
import { getTexturePack, tileTypeToImageSrc, tileTypeToImageClass, tileTypeToImageAlt } from "./tileUtils";

export const TileTypes = {
    EMPTY: 0,
    POINT: 1,

    HEAD_UP: 2,
    HEAD_DOWN: 3,
    HEAD_LEFT: 4,
    HEAD_RIGHT: 5,

    BODY_HORIZONTAL: 6,
    BODY_VERTICAL: 7,
    BODY_LEFT_UP: 8,
    BODY_LEFT_DOWN: 9,
    BODY_RIGHT_UP: 10,
    BODY_RIGHT_DOWN: 11,

    TAIL_UP: 12,
    TAIL_DOWN: 13,
    TAIL_LEFT: 14,
    TAIL_RIGHT: 15
};

export default function Tile({type = TileTypes.EMPTY}) {
    const difficulty = useSelector((state) => state.settings.difficulty)
    const texturePack = getTexturePack(difficulty)
    return (
        <td>
            <img 
            src={tileTypeToImageSrc(type, texturePack)}
            className={tileTypeToImageClass(type)} 
            alt={tileTypeToImageAlt(type)}
            />
        </td>
    )
}
