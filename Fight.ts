import Character from "./Character.ts";

class Fight{

    adventurers : Character[];
    monsters : Character[];
    turnIndex : number

    constructor(adventurers : Character[], monsters : Character[]){
        this.adventurers = adventurers;
        this.monsters = monsters;
        this.turnIndex = 0;
    }

    orderOfTurns(){
        const allCharacters = this.adventurers.concat(this.monsters);
        allCharacters.sort((a, b) => b.speed - a.speed)
    }

    nextTurns(){
        this.turnIndex = (this.turnIndex + 1) % (this.adventurers.length + this.monsters.length);
    }

    isFightOver(){
        if(this.adventurers.every(Character => Character.currentPv <= 0) || this.monsters.every(Character => Character.currentPv <= 0)){
            return "The fight is over"
        }
    }

    fighting(){
        
    }
}
