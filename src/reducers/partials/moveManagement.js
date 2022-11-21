import { PlayerPart } from "../gameReducer";
import { GameStage, BOARD_SIZE } from "../utils";
import { TileTypes } from "../../components/Tile";
import generateBoardState from "./boardGeneration";


export default function statePostMove(currentState) {
    if (!currentState.firstMove)
        return currentState
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
    board[pointLocation.x][pointLocation.y] = TileTypes.POINT;
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

const getNewFacing = (facing, moveQueue) => {
    while (moveQueue.length > 0 && moveQueue[0].type === facing.type)
        moveQueue.shift()
    if (moveQueue.length > 0)
        facing = moveQueue.shift();
    return facing
}
