import { useDispatch } from "react-redux"
import { setStage } from "../reducers/gameActions";
import { setDifficulty } from "../reducers/settingsActions";
import { Difficulty } from "../reducers/settingsReducer";
import { GameStage } from "../reducers/utils";


export default function GameMenu() {
    const dispatch = useDispatch();

    const chooseDifficultyAndPlay = (difficulty) => {
        dispatch(setDifficulty(difficulty));
        dispatch(setStage(GameStage.PLAY));
    }

    return (
        <div>
            <button onClick={e => chooseDifficultyAndPlay(Difficulty.NORMAL)}>Normal</button>
            <button onClick={e => chooseDifficultyAndPlay(Difficulty.SONIC)}>Sonic</button>
        </div>
    )
}