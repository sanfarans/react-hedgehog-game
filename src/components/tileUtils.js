import background from '../assets/background.png'
import point from '../assets/point.png'
import head from '../assets/head.png'
import body from '../assets/body.png'
import bodyTurn from '../assets/turn.png'
import tail from '../assets/tail.png'
import sonicPoint from '../assets/sonic_point.png'
import sonicHead from '../assets/sonic_head.png'
import sonicBody from '../assets/sonic_body.png'
import sonicBodyTurn from '../assets/sonic_turn.png'
import sonicTail from '../assets/sonic_tail.png'
import { Difficulty } from '../reducers/settingsReducer'
import { TileTypes } from './Tile'


export const tileTypeToImageSrc = (type, texturePack) => {
    switch(type) {
        case TileTypes.POINT:
            return texturePack.point;
        case TileTypes.HEAD_UP:
        case TileTypes.HEAD_DOWN:
        case TileTypes.HEAD_LEFT:
        case TileTypes.HEAD_RIGHT:
            return texturePack.head;
        case TileTypes.BODY_HORIZONTAL:
        case TileTypes.BODY_VERTICAL:
            return texturePack.body;
        case TileTypes.BODY_LEFT_UP:
        case TileTypes.BODY_LEFT_DOWN:
        case TileTypes.BODY_RIGHT_UP:
        case TileTypes.BODY_RIGHT_DOWN:
            return texturePack.bodyTurn;
        case TileTypes.TAIL_UP:
        case TileTypes.TAIL_DOWN:
        case TileTypes.TAIL_LEFT:
        case TileTypes.TAIL_RIGHT:
            return texturePack.tail;
        default:
            return texturePack.background;
    }
}

export const tileTypeToImageClass = (type) => {
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

export const tileTypeToImageAlt = (type) => {
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
        case TileTypes.TAIL_LEFT:
        case TileTypes.TAIL_RIGHT:
            return "┄";
        case TileTypes.TAIL_UP:
        case TileTypes.TAIL_DOWN:
            return "┊";
        default:
            return "⠀";
    }
}

class TexturePack {
    constructor(background, point, head, body, bodyTurn, tail) {
        this.background = background;
        this.point = point;
        this.head = head;
        this.body = body;
        this.bodyTurn = bodyTurn;
        this.tail = tail;
    }
}

export const getTexturePack = (difficulty) => {
    switch(difficulty) {
        case Difficulty.SONIC:
            return new TexturePack(
                background,
                sonicPoint,
                sonicHead,
                sonicBody,
                sonicBodyTurn,
                sonicTail
            )
        case Difficulty.NORMAL:
        default:
            return new TexturePack(
                background,
                point,
                head,
                body,
                bodyTurn,
                tail
            )
    }
}