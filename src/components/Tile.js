import background from '../assets/background.png'
import point from '../assets/point.png'
import head from '../assets/head.png'
import body from '../assets/body.png'
import bodyTurn from '../assets/turn.png'
import tail from '../assets/tail.png'


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

const tileTypeToImageSrc = (type) => {
    switch(type) {
        case TileTypes.POINT:
            return point;
        case TileTypes.HEAD_UP:
        case TileTypes.HEAD_DOWN:
        case TileTypes.HEAD_LEFT:
        case TileTypes.HEAD_RIGHT:
            return head;
        case TileTypes.BODY_HORIZONTAL:
        case TileTypes.BODY_VERTICAL:
            return body;
        case TileTypes.BODY_LEFT_UP:
        case TileTypes.BODY_LEFT_DOWN:
        case TileTypes.BODY_RIGHT_UP:
        case TileTypes.BODY_RIGHT_DOWN:
            return bodyTurn;
        case TileTypes.TAIL_UP:
        case TileTypes.TAIL_DOWN:
        case TileTypes.TAIL_LEFT:
        case TileTypes.TAIL_RIGHT:
            return tail;
        default:
            return background;
    }
}

const tileTypeToImageClass = (type) => {
    switch(type) {
        case TileTypes.POINT:
            return "";
        case TileTypes.HEAD_UP:
            return "";
        case TileTypes.HEAD_DOWN:
            return "rotate180";
        case TileTypes.HEAD_LEFT:
            return "rotate270";
        case TileTypes.HEAD_RIGHT:
            return "rotate90";
        case TileTypes.BODY_HORIZONTAL:
            return "rotate90";
        case TileTypes.BODY_VERTICAL:
            return "";
        case TileTypes.BODY_LEFT_UP:
            return "rotate180";
        case TileTypes.BODY_LEFT_DOWN:
            return "rotate90";
        case TileTypes.BODY_RIGHT_UP:
            return "rotate270";
        case TileTypes.BODY_RIGHT_DOWN:
            return ""
        case TileTypes.TAIL_UP:
            return ""
        case TileTypes.TAIL_DOWN:
            return "rotate180"
        case TileTypes.TAIL_LEFT:
            return "rotate270"
        case TileTypes.TAIL_RIGHT:
            return "rotate90";
        default:
            return "";
    }
}

export default function Tile({type = TileTypes.EMPTY}) {
    return (
        <td>
            <img src={tileTypeToImageSrc(type)} className={tileTypeToImageClass(type)} />
        </td>
    )
}
