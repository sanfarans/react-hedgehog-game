import { TileTypes } from "../components/Tile"

export const BOARD_SIZE = 10;

const generateInitialBoardState = (n = BOARD_SIZE) => {
    let initialBoard = [];
    for (let i = 0; i < n; ++i)
        initialBoard.push(new Array(n).fill(TileTypes.EMPTY))
    let mid = Math.floor((n-1)/2);
    initialBoard[mid][1] = TileTypes.TAIL;
    initialBoard[mid][2] = TileTypes.BODY;
    initialBoard[mid][3] = TileTypes.BODY;
    initialBoard[mid][4] = TileTypes.HEAD;
    initialBoard[mid][7] = TileTypes.POINT;
    return initialBoard;
}

export default function boardReducer(state = generateInitialBoardState(), action) {
    switch (action.type) {
        default:
            return state
    }
}
