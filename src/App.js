import { useEffect, useState } from "react";
import classnames from "classnames";
import TicTacToe from "./algorithm";

let game = new TicTacToe(3);

const App = () => {
    const [xPlayerName, setXPlayerName] = useState("");
    const [oPlayerName, setOPlayerName] = useState("");
    const [size, setSize] = useState(3);
    const [board, setBoard] = useState(Array(9).fill(undefined));
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [turn, setTurn] = useState("");
    const [isGameEnd, setIsGameEnd] = useState(false);
    const [clickedIndices, setClickedIndices] = useState({});
    const [gameResult, setGameResult] = useState({});

    useEffect(() => {
        setBoard(Array(Math.pow(parseInt(size), 2)).fill(undefined));
        setClickedIndices({});
        setIsGameStarted(false);
        setGameResult({});
    }, [size]);

    useEffect(() => {
        console.log("updated");
        let result = game && game.calculateWin(board);

        if (result) {
            setGameResult(result);
            setIsGameEnd(true);
        } else if (Object.keys(clickedIndices).length === size) {
            setIsGameEnd(true);
        }
    }, [board]);

    const handleOnChangeXName = (e) => {
        if (!isGameStarted) {
            setXPlayerName(e.target.value);
        }
    };
    const handleOnChangeOName = (e) => {
        if (!isGameStarted) {
            setOPlayerName(e.target.value);
        }
    };

    const handleOnChangeGameSize = (e) => {
        setSize(e.target.value[0]);
    };

    const handleOnSubmitGameStart = (e) => {
        e.preventDefault();
        if (xPlayerName && oPlayerName && size) {
            game = new TicTacToe(parseInt(size));
            setIsGameStarted(true);
            setBoard(Array(Math.pow(parseInt(size), 2)).fill(undefined));
            setTurn("X");
        }
    };
    const handleOnClickCell = (idx) => {
        if (!clickedIndices[idx]) {
            setClickedIndices({ ...clickedIndices, [idx]: true });
            let copyBoard = [...board];
            copyBoard[idx] = turn;
            setBoard(copyBoard);
            setTurn(turn === "X" ? "O" : "X");
        }
    };

    return (
        <div className="game">
            <h1 className="game__title">Tic Tac Toe</h1>
            <div className="game__settings">
                <form onSubmit={handleOnSubmitGameStart}>
                    <label htmlFor="game__x-player">Enter X Player Name</label>
                    <input
                        onChange={handleOnChangeXName}
                        type="text"
                        id="game__x-player"
                        value={xPlayerName}
                    />
                    <label htmlFor="game__o-player">Enter O Player Name</label>
                    <input
                        onChange={handleOnChangeOName}
                        type="text"
                        id="game__o-player"
                        value={oPlayerName}
                    />
                    <label htmlFor="game__size">Enter game size</label>
                    <select
                        id="game__size"
                        value={size}
                        onChange={handleOnChangeGameSize}
                    >
                        <option value="null">Select Size</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                    <input
                        type="submit"
                        value="Start Game"
                        className="game__settings-button"
                        disabled={!xPlayerName || !oPlayerName || !size}
                    />
                </form>
            </div>
            <div
                className={classnames(
                    "game__board",
                    size && `game__board--${size}`,
                    !isGameStarted && "disable"
                )}
            >
                {board.length &&
                    board.map((entry, idx) => {
                        return (
                            <div
                                key={idx}
                                className={classnames(
                                    "game__board-cell",
                                    Object.keys(gameResult).length > 0 &&
                                        gameResult.winCase.indexOf(idx) !==
                                            -1 &&
                                        clickedIndices[idx] &&
                                        "game__board-cell--won"
                                )}
                                onClick={() => handleOnClickCell(idx)}
                            >
                                {entry && entry}
                            </div>
                        );
                    })}
            </div>
            <div className="game__results">Results</div>
        </div>
    );
};

export default App;
