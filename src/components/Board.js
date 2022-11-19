import "./Board.css"
import { useSelector } from "react-redux";
import Tile from "./Tile";
import { BOARD_SIZE } from "../reducers/utils";


export default function Board() {
    const board = useSelector((state) => state.game.board);
    const points = useSelector((state) => state.game.points)

    let rowCnt = -1;
    let colCnt = -1;
    const n = BOARD_SIZE;

    const htmlBoard = board.map((row) => (
        <tr key={++rowCnt}>
            {row.map((cell) => (
                <Tile key={`${rowCnt+1}-${(++colCnt)%n}`} type={cell} />
            ))}
        </tr>
    ))

    return (
        <div>
            <h2>Points: {points}</h2>
            <table className="Board">
                <tbody>
                    {htmlBoard}
                </tbody>
            </table>
        </div>
    )
}
