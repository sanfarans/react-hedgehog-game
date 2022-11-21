export const Difficulty = {
    NORMAL: 200,
    SONIC: 100
}

const initialState = {
    difficulty: Difficulty.NORMAL
}

export default function settingsReducer(state = initialState, action) {
    switch(action.type) {
        case "settings/setDifficulty":
            return {...state, difficulty: action.payload.difficulty}
        default:
            return state
    }
}
