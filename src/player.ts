export class PlayerCharacter {
 
    name: string;
    money: number;

    walking: string = "";

    constructor(name:string) {
        this.name = name;        
    }

    getAnimationValues() {
        return {
            //stoped
            idleLeft: { from: 8, to: 8 },
            idleRight: { from: 10, to: 10 },
            idleUp: { from: 5, to: 5 },
            idleDown: { from: 1, to: 1 },
        
            //move
            moveLeft: { from: 8 , to: 9, loop: true },
            moveRight: { from: 10, to: 11, loop: true },
            moveUp: { from: 4, to: 7, loop: true },
            moveDown: { from: 0, to: 3, loop: true },    
          }  
    }

    addMoney(amount: number) {
        this.money += amount;
    } 

    removeMoney(amount: number) {
        this.money -= amount;
    } 
    
    walk(direction: string) {
        this.walking = direction;
    }

    stopWalk() {
        this.walking = "";
    }

    isWalking() {        
        return this.walking !== "";
    }
}