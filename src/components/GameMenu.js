import { useDispatch } from "react-redux"
import { setStage } from "../reducers/gameActions";
import { GameStage } from "../reducers/gameReducer";

export default function GameMenu() {
    const dispatch = useDispatch();
    return (
        <div>
            <button onClick={e => dispatch(setStage(GameStage.PLAY))}>Start</button>
        </div>
    )
}