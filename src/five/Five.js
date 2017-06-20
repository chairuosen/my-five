import Chessman from './Chessman';
import Board from './Board';
import {CHESSMAN_STATE} from './const';
import Player from './Player';

class Five {
    constructor(){
        this.board = new Board();
        this.player = [
            new Player('me',CHESSMAN_STATE.BLACK), // black
            new Player('Alpha Go',CHESSMAN_STATE.WHITE)
        ];
        this.history = [];
        this.winner = null;
        this.currentStep = -1;// first step is 0;
    }
    getLastChessmanPosition(){
        return this.history[this.currentStep];
    }
    getNextStepPlayer(index = this.currentStep){
        var isOdd = Math.abs(index%2) === 0;
        return isOdd ? this.player[1] : this.player[0];
    }
    nextStepChoseHere(row,col,_player){
        var player = this.getNextStepPlayer();
        if(_player && player!==_player)return; // optional force check
        if(player.isLocked())return;
        var chessman = this.board.getChessman(row,col);
        if(chessman.isLocked())return;
        this.history.length = this.currentStep+1;
        this.currentStep++;
        this.history.push({
            row,col,
            // time:+new Date(),
            player:player.name
        });
        this.renderBoard();
    }
    historyGo(step){
        var target = this.currentStep+step;
        if(target===-1 || this.history[target]){
            this.currentStep = target;
            this.renderBoard();
        }
    }
    renderBoard(){
        var forkedHistory = [].concat(this.history);
        forkedHistory.length = this.currentStep+1;
        this.board.reset();
        forkedHistory.forEach( (obj,index) => {
            var chessman = this.board.getChessman(obj.row,obj.col);
            var player = this.getNextStepPlayer(index-1);
            chessman.setState(player.type);
        });
        var winnerType = this.board.boardChecker();
        if(winnerType>0){
            var winner;
            this.player.forEach((player)=>{
                if(player.type===winnerType){
                    winner = player;
                }
                player.lock();
            });
            this.winner = winner;
        }
    }
}

export default Five;
