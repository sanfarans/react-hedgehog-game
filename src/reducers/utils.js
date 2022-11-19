export const BOARD_SIZE = 10;

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
