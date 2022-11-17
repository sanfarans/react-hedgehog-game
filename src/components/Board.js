import "./Board.css"
import { useDispatch, useSelector } from "react-redux";
import Tile from "./Tile";
import { BOARD_SIZE } from "../reducers/boardReducer";


export default function Board() {
    const board = useSelector((state) => state.board);
    const dispatch = useDispatch();

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
        <table className="Board">
            <tbody>
                {htmlBoard}
            </tbody>
        </table>
    )
}
