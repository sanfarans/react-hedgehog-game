import { useDispatch, useSelector } from 'react-redux'
import Board from './Board';
import { useEffect } from 'react';
import { Direction } from '../reducers/gameReducer';
import { turn, move, setStage } from '../reducers/gameActions';
import { GameStage } from '../reducers/gameReducer';
import GameMenu from './GameMenu';

export default function GameLogic() {

    const currentDirection = useSelector((state) => state.game.facing)
    const gameStage = useSelector((state) => state.game.gameStage)

    const dispatch = useDispatch();

    useEffect(() => {
        const id = setInterval(() => {
            if (gameStage === GameStage.PLAY)
                dispatch(move())
        }, 1000);
        const onKeyDown = (e) => {
            if (gameStage !== GameStage.PLAY)
                return
            switch(e.key) {
                case "ArrowRight":
                    if (currentDirection === Direction.LEFT || currentDirection === Direction.RIGHT)
                        return
                    dispatch(turn(Direction.RIGHT))
                    break;
                case "ArrowLeft":
                    if (currentDirection === Direction.LEFT || currentDirection === Direction.RIGHT)
                        return
                    dispatch(turn(Direction.LEFT))
                    break;
                case "ArrowUp":
                    if (currentDirection === Direction.DOWN || currentDirection === Direction.UP)
                        return
                    dispatch(turn(Direction.UP))
                    break;
                case "ArrowDown":
                    if (currentDirection === Direction.DOWN || currentDirection === Direction.UP)
                        return
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
