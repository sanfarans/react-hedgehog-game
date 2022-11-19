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

    TAIL_HORIZONTAL: 12,
    TAIL_VERTICAL: 13
};

const tileTypeToCellContent = (type) => {
    switch(type) {
        case TileTypes.POINT:
            return "o";
        case TileTypes.HEAD_UP:
            return "╿";
        case TileTypes.HEAD_DOWN:
            return "╽";
        case TileTypes.HEAD_LEFT:
            return "╾";
        case TileTypes.HEAD_RIGHT:
            return "╼";
        case TileTypes.BODY_HORIZONTAL:
            return "═";
        case TileTypes.BODY_VERTICAL:
            return "║";
        case TileTypes.BODY_LEFT_UP:
            return "╝";
        case TileTypes.BODY_LEFT_DOWN:
            return "╗";
        case TileTypes.BODY_RIGHT_UP:
            return "╚";
        case TileTypes.BODY_RIGHT_DOWN:
            return "╔"
        case TileTypes.TAIL_HORIZONTAL:
            return "┄";
        case TileTypes.TAIL_VERTICAL:
            return "┊";
        default:
            return "⠀";
    }
}

export default function Tile({type = TileTypes.EMPTY}) {
    let cellContent = tileTypeToCellContent(type);
    return (
        <td>
            {cellContent}
        </td>
    )
}
