import { TileTypes } from "../components/Tile"

export const BOARD_SIZE = 10;

class PlayerPart {
    constructor(x, y, next) {
        this.x = x;
        this.y = y;
        this.next = next
    }
}

const generateInitialPlayer = (n = BOARD_SIZE) => {
    let mid = Math.floor((n-1)/2);
    let playerHead = new PlayerPart(mid, 1, null)
    playerHead = new PlayerPart(mid, 2, playerHead);
    playerHead = new PlayerPart(mid, 3, playerHead);
    playerHead = new PlayerPart(mid, 4, playerHead);
    return playerHead
}

const generateBoardState = (playerHead, n = BOARD_SIZE) => {
    let board = [];
    for (let i = 0; i < n; ++i)
        board.push(new Array(n).fill(TileTypes.EMPTY))
    let mid = Math.floor((n-1)/2);
    board[playerHead.x][playerHead.y] = TileTypes.HEAD
    let playerPart = playerHead.next;
    while (playerPart != null) {
        board[playerPart.x][playerPart.y] = (
            playerPart.next == null ? TileTypes.TAIL : TileTypes.BODY
        )
        playerPart = playerPart.next;
    }

    board[mid][8] = TileTypes.POINT
    return board;
}


export const Direction = {
    RIGHT: {x: 0, y: 1},
    LEFT: {x: 0, y: -1},
    UP: {x: -1, y: 0},
    DOWN: {x: 1, y: 0}
}

const initialState = () => {
    const playerHead = generateInitialPlayer();
    return {
        'board': generateBoardState(playerHead),
        'playerHead': playerHead,
        'facing': Direction.RIGHT,
        'directionChosen': false
    }
}

const statePostMove = (currentBoard, currentPlayerHead, facing) => {
    let nextX = currentPlayerHead.x + facing.x;
    let nextY = currentPlayerHead.y + facing.y;
    const playerHead = new PlayerPart(nextX, nextY, currentPlayerHead);
    let playerTail = playerHead;
    while (playerTail.next.next != null)
        playerTail = playerTail.next;
    playerTail.next = null;
    return {
        'board': generateBoardState(playerHead),
        'playerHead': playerHead,
        'facing': facing,
        'directionChosen': false
    }
}

export default function boardReducer(state = initialState(), action) {
    switch (action.type) {
        case "board/turn":
            if (state.directionChosen)
                return state
            state = {...state, facing: action.payload.direction, directionChosen: true}
            return state
        case "board/move":
            state = statePostMove(state.board, state.playerHead, state.facing)
            return state
        default:
            return state
    }
}
