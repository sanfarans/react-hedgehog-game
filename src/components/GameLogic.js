import { useDispatch, useSelector } from 'react-redux'
import Board from './Board';
import { useEffect } from 'react';
import { Direction } from '../reducers/boardReducer';

export default function GameLogic() {

    const currentDirection = useSelector((state) => state.board.facing)
    const dispatch = useDispatch();

    useEffect(() => {
        const id = setInterval(() => {
            dispatch(move())
        }, 1000);
        const onKeyDown = (e) => {
            switch(e.key) {
                case "ArrowRight":
                    if (currentDirection in [Direction.LEFT, Direction.RIGHT])
                        return
                    dispatch(turn(Direction.RIGHT))
                    break;
                case "ArrowLeft":
                    if (currentDirection in [Direction.LEFT, Direction.RIGHT])
                        return
                    dispatch(turn(Direction.LEFT))
                    break;
                case "ArrowUp":
                    if (currentDirection in [Direction.DOWN, Direction.UP])
                        return
                    dispatch(turn(Direction.UP))
                    break;
                case "ArrowDown":
                    if (currentDirection in [Direction.DOWN, Direction.UP])
                        return
                    dispatch(turn(Direction.DOWN))
                    break;
                default:
            }
        }
        document.addEventListener('keydown', onKeyDown, true);

        return () => {clearInterval(id)};
    })



    return (
        <Board />
    );
}

function turn(direction) {
    return {
        type: "board/turn",
        payload: {
            direction: direction
        }
    }
}

function move() {
  return {
      type: "board/move",
      payload: {}
  }
}
