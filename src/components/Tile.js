export const TileTypes = {
    EMPTY: 0,
    POINT: 1,
    HEAD: 2,
    BODY: 3,
    TAIL: 4
};

const tileTypeToCellContent = (type) => {
    switch(type) {
        case TileTypes.HEAD:
            return "H";
        case TileTypes.BODY:
            return "B";
        case TileTypes.TAIL:
            return "T";
        case TileTypes.POINT:
            return "P";
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
