import './GameLogic.css'
import { useDispatch, useSelector } from 'react-redux'
import Board from './Board';
import { useEffect, useState } from 'react';
import { turn, move, setStage } from '../reducers/gameActions';
import GameMenu from './GameMenu';
import { Direction, GameStage } from '../reducers/utils';


export default function GameLogic() {
    const gameStage = useSelector((state) => state.game.gameStage)
    const speed = useSelector((state) => state.settings.difficulty)
    const dispatch = useDispatch();

    useEffect(() => {
        const id = setInterval(() => {
            if (gameStage === GameStage.PLAY)
                dispatch(move())
        }, speed);
        const onKeyDown = (e) => {
            if (gameStage !== GameStage.PLAY)
                return
            if (e.key.startsWith("Arrow")) {
                const startModal = document.getElementById("start-modal");
                startModal.style.display = "none";
            }
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
                    <div id="lose-modal">
                        <div>
                            You Lose!
                        </div>
                        <div>
                            <button onClick={e => dispatch(setStage(GameStage.MENU))}>Menu</button>
                            <button onClick={e => dispatch(setStage(GameStage.PLAY))}>Restart</button>
                        </div>
                    </div>
                </div>
            )
        default:
            return (
                <div>
                    <div id="start-modal">
                        <p>Press any arrow key to start</p>
                    </div>
                    <Board />
                </div>
            )
    }
}
