export function setDifficulty(difficulty) {
    return {
        type: "settings/setDifficulty",
        payload: {
            difficulty: difficulty
        }
    }
}
