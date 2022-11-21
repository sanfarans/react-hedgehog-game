import "./GameMenu.css"
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
            <h1>The Hedgehog Game</h1>
            <button className="difficulty-button" onClick={e => chooseDifficultyAndPlay(Difficulty.NORMAL)}>
                Play as the Hedgehog
            </button>
            <button className="difficulty-button" onClick={e => chooseDifficultyAndPlay(Difficulty.SONIC)}>
                Play as Sonic the Hedgehog
            </button>
        </div>
    )
}