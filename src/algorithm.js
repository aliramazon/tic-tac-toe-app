class TicTacToe {
    constructor(size) {
        this.size = size;
        this.winCases = [];
    }

    #generateHorizontalWinCases = () => {
        let winCase = [];

        for (let i = 0; i < this.size ** 2; i++) {
            winCase.push(i);
            if (winCase.length === this.size) {
                this.winCases.push(winCase);
                winCase = [];
            }
        }
    };

    #generateVerticalWinCases = () => {
        let winCase = [];
        for (let j = 0; j < this.size; j++) {
            let acc = j;

            while (winCase.length < this.size) {
                winCase.push(acc);
                acc += this.size;
            }
            this.winCases.push(winCase);
            winCase = [];
        }
    };

    #generateDiagonalWinCases = () => {
        let acc = 0;
        let winCase = [];

        while (winCase.length < this.size) {
            winCase.push(acc);
            acc += this.size + 1;
        }
        this.winCases.push(winCase);

        winCase = [];
        acc = this.size - 1;

        while (winCase.length < this.size) {
            winCase.push(acc);
            acc += this.size - 1;
        }
        this.winCases.push(winCase);
        winCase = [];
    };

    #generateAllWinCases = () => {
        this.winCases = [];
        this.#generateHorizontalWinCases();
        this.#generateVerticalWinCases();
        this.#generateDiagonalWinCases();
    };

    #getAllWinCases = () => {
        this.#generateAllWinCases();
        return this.winCases;
    };

    calculateWin(squares) {
        let winCases = this.#getAllWinCases();

        for (let winCase of winCases) {
            let winUser = squares[winCase[0]];
            let isWin = winCase.every(
                (index) =>
                    squares[index] === winUser && squares[index] !== undefined
            );
            if (isWin) {
                return { winUser, winCase };
            }
        }
        return null;
    }
}

export default TicTacToe;
