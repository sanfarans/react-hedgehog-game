import { TileTypes } from "../components/Tile"
import generateBoardState from "./partials/boardGeneration";
import { Direction, GameStage, BOARD_SIZE } from "./utils";
import statePostMove from "./partials/moveManagement";


export class PlayerPart {
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

const getInitialState = () => {
    const playerHead = generateInitialPlayer();
    const pointLocation = {x: playerHead.x, y: playerHead.y + 3}
    const board = generateBoardState(playerHead)
    board[pointLocation.x][pointLocation.y] = TileTypes.POINT;
    return {
        board: board,
        playerHead: playerHead,
        pointLocation: pointLocation,
        points: 0,
        facing: Direction.RIGHT,
        moveQueue: [],
        gameStage: GameStage.MENU
    }
}

export default function gameReducer(state = getInitialState(), action) {
    switch (action.type) {
        case "game/setStage":
            switch(action.payload.stage) {
                case GameStage.MENU:
                    return getInitialState();
                case GameStage.PLAY:
                    return {...getInitialState(), gameStage: GameStage.PLAY}
                default:
                    return {...state, gameStage: action.payload.stage}
            }
        case "board/turn":
            if (state.moveQueue.length > 5)
                return state
            let newMoveQueue = state.moveQueue
            newMoveQueue.push(action.payload.direction)
            state = {...state, moveQueue: newMoveQueue}
            return state
        case "board/move":
            state = statePostMove(state)
            return state
        default:
            return state
    }
}
