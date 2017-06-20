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
        try{
            return this._board[row][col];
        }catch(e){
            return undefined;
        }
    }
    forEach(callback){
        var i,j;
        for(i=0;i<this.height;i++){
            for(j=0;j<this.width;j++){
                callback(this._board[i][j],i,j);
            }
        }
    }
    reset(){
        this.forEach(item=>{
            item.reset();
        });
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
    boardChecker(){
        var _this = this;
        var positionCache = {};
        var DIRECTION = {
            0:0,
            90:1,
            135:2,
            45:3
        };
        var winnerType;

        function setPositionResultFalse(row,col,direction) {
            var k = `${row}-${col}`;
            if(!positionCache[k]){
                positionCache[k] = {}
            }
            positionCache[k][direction] = false;
        }
        function isPositionDirectionFalse(row,col,direction) {
            var k = `${row}-${col}`;
            if(!positionCache[k]){
                return false;
            }
            return positionCache[k][direction] === false;
        }
        function checkPosition(row,col){
            var result = false;
            [
                DIRECTION[0],
                DIRECTION[90],
                DIRECTION[135],
                DIRECTION[45]
            ].forEach(function (direction) {
                if(checkDirection(row,col,direction)){
                    result = true;
                }
            });
            return result;
        }
        function checkDirection(row,col,direction) {
            function getNextSameType(next,type,direction){
                var i;
                var result = [];
                for(i=0;i<4;i++){
                    if(i>=4){
                        return result;
                    }
                    var _i = i+1;
                    var nextRow,nextCol;
                    switch (direction){
                        case DIRECTION[0]:
                            nextRow = row;
                            nextCol = next ? col+_i : col-_i;
                            break;
                        case DIRECTION[90]:
                            nextRow = next ? row+_i : row-_i;
                            nextCol = col;
                            break;
                        case DIRECTION[135]:
                            nextRow = next ? row+_i : row-_i;
                            nextCol = next ? col+_i : col-_i;
                            break;
                        case DIRECTION[45]:
                            nextRow = next ? row+_i : row-_i;
                            nextCol = next ? col-_i : col+_i;
                            break;
                    }
                    var nextOne = _this.getChessman(nextRow,nextCol);
                    if( nextOne ){
                        if(nextOne.state !== type){
                            return result;
                        }else{
                            result.push({row:nextRow,col:nextCol});
                        }
                    }
                }
                return result;
            }

            var chessman = _this.getChessman(row,col);
            if(chessman.isEmpty())return false;
            if(isPositionDirectionFalse(row,col,direction))return false;
            var type = chessman.state;
            var nextArr = getNextSameType(true,type,direction);
            var prevArr = getNextSameType(false,type,direction);
            var result = nextArr.length + prevArr.length + 1;
            if(result >=5){
                winnerType = type;
                return true;
            }else{
                nextArr.concat(prevArr).forEach(function (o) {
                    setPositionResultFalse(o.row,o.col,direction);
                });
                return false;
            }
        }

        function checkAllChessman() {
            var result = false;
            _this.forEach(function (item,row,col) {
                if(checkPosition(row,col)){
                    result = true;
                }
            })
            return result;
        }


        if(checkAllChessman()){
            return winnerType;
        }else{
            return 0;
        }

    }
}
export default Board;
