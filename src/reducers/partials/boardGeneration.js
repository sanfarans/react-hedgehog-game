import { TileTypes } from "../../components/Tile";
import { BOARD_SIZE } from "../utils";


export default function generateBoardState(playerHead, n = BOARD_SIZE) {
    let board = [];
    for (let i = 0; i < n; ++i)
        board.push(new Array(n).fill(TileTypes.EMPTY))
    board[playerHead.x][playerHead.y] = determineHead(playerHead, playerHead.next)
    let playerPart = playerHead.next;
    let prev = playerHead;
    while (playerPart != null) {
        if (playerPart.next == null)
            board[playerPart.x][playerPart.y] = determineTail(prev, playerPart);
        else
            board[playerPart.x][playerPart.y] = determineBodyPart(prev, playerPart, playerPart.next);
        prev = playerPart;
        playerPart = playerPart.next;
    }
    return board;
}

const determineHead = (head, next) => {
    const diffX = head.x - next.x;
    const diffY = head.y - next.y;

    if (diffX === 0) {
        if (diffY === 1)
            return TileTypes.HEAD_RIGHT;
        return TileTypes.HEAD_LEFT
    }
    if (diffX === 1)
        return TileTypes.HEAD_DOWN;
    return TileTypes.HEAD_UP;
}

const determineBodyPart = (prev, current, next) => {
    const diffX1 = prev.x - current.x;
    const diffY1 = prev.y - current.y;
    const diffX2 = current.x - next.x;
    const diffY2 = current.y - next.y;

    if (diffX1 === 0 && diffX2 === 0)
        return TileTypes.BODY_HORIZONTAL
    if (diffY1 === 0 && diffY2 === 0)
        return TileTypes.BODY_VERTICAL
    if (diffX1 === 0 && diffY1 === 1) { // right
        if (diffX2 === 1) // up
            return TileTypes.BODY_RIGHT_UP
        return TileTypes.BODY_RIGHT_DOWN
    }
    if (diffX1 === 0 && diffY1 === -1) { // left
        if (diffX2 === 1) // up
            return TileTypes.BODY_LEFT_UP
        return TileTypes.BODY_LEFT_DOWN
    }
    if (diffY1 === 0 && diffX1 === 1) { // down
        if (diffY2 === 1) // left
            return TileTypes.BODY_LEFT_DOWN
        return TileTypes.BODY_RIGHT_DOWN
    }
    if (diffY1 === 0 && diffX1 === -1) { // up
        if (diffY2 === 1) // left
            return TileTypes.BODY_LEFT_UP
        return TileTypes.BODY_RIGHT_UP
    }
    return TileTypes.BODY_HORIZONTAL;
}

const determineTail = (prev, tail) => {
    const diffX = prev.x - tail.x;
    const diffY = prev.y - tail.y;

    if (diffX === 0) {
        if (diffY === 1)
            return TileTypes.TAIL_RIGHT;
        return TileTypes.TAIL_LEFT
    }
    if (diffX === 1)
        return TileTypes.TAIL_DOWN;
    return TileTypes.TAIL_UP;
}
