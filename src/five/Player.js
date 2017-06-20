export default class Player {
    constructor(name,color){
        this.name = name;
        this.color = color;
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
