export function turn(direction) {
    return {
        type: "board/turn",
        payload: {
            direction: direction
        }
    }
}

export function move() {
    return {
        type: "board/move",
        payload: {}
    }
}

export function setStage(stage) {
    return {
        type: "game/setStage",
        payload: {
            stage: stage
        }
    }
}
