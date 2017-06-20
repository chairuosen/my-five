export default class Player {
    constructor(name,type){
        this.name = name;
        this.type = type;
        this.locked = false;
    }
    lock(){
        this.locked = true;
    }
    unlock(){
        this.locked = false;
    }
    isLocked(){
        return this.locked;
    }
}
