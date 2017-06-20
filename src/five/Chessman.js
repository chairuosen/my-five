import {CHESSMAN_STATE} from './const';
class Chessman {
    constructor(){
        this.state = CHESSMAN_STATE.DEFAULT;
    }
    setState(state){
        if(state && this.state===CHESSMAN_STATE.DEFAULT){
            this.state = state;
        }
    }
    isLocked(){
        return this.state !== CHESSMAN_STATE.DEFAULT;
    }
    isEmpty(){
        return this.state === CHESSMAN_STATE.DEFAULT;
    }
    reset(){
        this.state = CHESSMAN_STATE.DEFAULT;
    }
}
export default Chessman;
