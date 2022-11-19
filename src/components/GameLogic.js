import { useDispatch, useSelector } from 'react-redux'
import Board from './Board';
import { useEffect } from 'react';
import { turn, move, setStage } from '../reducers/gameActions';
import GameMenu from './GameMenu';
import { Direction, GameStage } from '../reducers/utils';


export default function GameLogic() {
    const gameStage = useSelector((state) => state.game.gameStage)
    const dispatch = useDispatch();

    useEffect(() => {
        const id = setInterval(() => {
            if (gameStage === GameStage.PLAY)
                dispatch(move())
        }, 500);
        const onKeyDown = (e) => {
            if (gameStage !== GameStage.PLAY)
                return
            switch(e.key) {
                case "ArrowRight":
                    dispatch(turn(Direction.RIGHT))
                    break;
                case "ArrowLeft":
                    dispatch(turn(Direction.LEFT))
                    break;
                case "ArrowUp":
                    dispatch(turn(Direction.UP))
                    break;
                case "ArrowDown":
                    dispatch(turn(Direction.DOWN))
                    break;
                default:
            }
        }
        document.addEventListener('keydown', onKeyDown, true);

        return () => {
            clearInterval(id);
            document.removeEventListener('keydown', onKeyDown, true);
        };
    })

    switch(gameStage) {
        case GameStage.MENU:
            return (
                <GameMenu />
            )
        case GameStage.LOST:
            return (
                <div>
                    <Board />
                    <div>
                        You Lose!
                    </div>
                    <div>
                        <button onClick={e => dispatch(setStage(GameStage.MENU))}>Menu</button>
                        <button onClick={e => dispatch(setStage(GameStage.PLAY))}>Restart</button>
                    </div>
                </div>
            )
        default:
            return (
                <Board />
            )
    }
}
