import Chessman from './Chessman';
class Board {
    constructor(width,height) {
        this.width = width || 10;
        this.height = height || 10;
        this._board = [];
        this.init();
    }
    getBoard(){
        return this._board;
    }
    getChessman(row,col){
        return this._board[row][col];
    }
    reset(){
        var i,j;
        for(i=0;i<this.height;i++){
            for(j=0;j<this.width;j++){
                this._board[i][j].reset();
            }
        }
    }
    init(){
        var i,j;
        this._board.length = 0;
        for(i=0;i<this.height;i++){
            this._board[i] = [];
            for(j=0;j<this.width;j++){
                this._board[i].push(new Chessman())
            }
        }
    }
}
export default Board;
