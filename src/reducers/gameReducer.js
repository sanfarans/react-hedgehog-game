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

const getNewPointLocation = (board, n = BOARD_SIZE) => {
    let possiblePlaces = [];
    for (let i = 0; i < n; ++i)
        for (let j = 0; j < n; ++j)
            if (board[i][j] === TileTypes.EMPTY)
                possiblePlaces.push({x: i, y: j})
    if (possiblePlaces.length === 0) {
        console.log('wow u won this is so unexpected that i didnt take time to implement the congrats screen so this console message is all u get')
        return
    }
    return possiblePlaces[Math.floor(Math.random()*possiblePlaces.length)];
}

const generateBoardState = (playerHead, pointLocation, n = BOARD_SIZE) => {
    let board = [];
    for (let i = 0; i < n; ++i)
        board.push(new Array(n).fill(TileTypes.EMPTY))
    board[playerHead.x][playerHead.y] = TileTypes.HEAD
    let playerPart = playerHead.next;
    while (playerPart != null) {
        board[playerPart.x][playerPart.y] = (
            playerPart.next == null ? TileTypes.TAIL : TileTypes.BODY
        )
        playerPart = playerPart.next;
    }
    return board;
}

const placePoint = (board, pointLocation) => {
    board[pointLocation.x][pointLocation.y] = TileTypes.POINT;
}


export const Direction = {
    RIGHT: {x: 0, y: 1, type: 'horizontal'},
    LEFT: {x: 0, y: -1, type: 'horizontal'},
    UP: {x: -1, y: 0, type: 'vertical'},
    DOWN: {x: 1, y: 0, type: 'vertical'}
}

export const GameStage = {
    MENU: 0,
    PLAY: 1,
    LOST: 2
}

const getNewFacing = (facing, moveQueue) => {
    while (moveQueue.length > 0 && moveQueue[0].type === facing.type)
        moveQueue.shift()
    if (moveQueue.length > 0)
        facing = moveQueue.shift();
    return facing
}

const statePostMove = (currentState) => {
    const currentPlayerHead = currentState.playerHead;
    const facing = getNewFacing(currentState.facing, currentState.moveQueue);
    let pointLocation = currentState.pointLocation;

    let nextX = currentPlayerHead.x + facing.x;
    let nextY = currentPlayerHead.y + facing.y;

    // check if player crashed into the wall
    if (Math.min(nextX, nextY) < 0 || Math.max(nextX, nextY) >= BOARD_SIZE)
        return {...currentState, gameStage: GameStage.LOST}
    
    const pointCollected = (
        pointLocation.x === nextX && pointLocation.y === nextY
    )

    // update player position
    const playerHead = new PlayerPart(nextX, nextY, currentPlayerHead);
    let playerTail = playerHead;
    while (playerTail.next.next != null)
        playerTail = playerTail.next;
    if (!pointCollected)
        playerTail.next = null;
    
    // check if player self crashed
    let playerPart = playerHead.next;
    while (playerPart) {
        if (playerPart.x === playerHead.x && playerPart.y === playerHead.y)
        return {...currentState, board: generateBoardState(playerHead),
            playerHead: playerHead, gameStage: GameStage.LOST}
            playerPart = playerPart.next
        }
            
    let board = generateBoardState(playerHead)
    if (pointCollected)
        pointLocation = getNewPointLocation(board);
    placePoint(board, pointLocation)
    return {
        ...currentState,
        board: board,
        playerHead: playerHead,
        facing: facing,
        pointLocation: pointLocation,
        points: currentState.points + pointCollected,
        directionChosen: false
    }
}

const getInitialState = () => {
    const playerHead = generateInitialPlayer();
    const pointLocation = {x: playerHead.x, y: playerHead.y + 3}
    const board = generateBoardState(playerHead, pointLocation)
    placePoint(board, pointLocation);
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
