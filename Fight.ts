import Character from "./Character.ts";

class Fight{

    adventurers : Character[];
    monsters : Character[];

    constructor(adventurers : Character[], monsters : Character[]){
        this.adventurers = adventurers;
        this.monsters = monsters;
    }

    orderOfTurns(){
        const allCharacters = this.adventurers.concat(this.monsters);
        allCharacters.sort((a, b) => b.speed - a.speed)
    }

    nextTurns(){
        
    }

    isFightOver(){
        if(this.adventurers.every(Character => Character.currentPv <= 0) || this.monsters.every(Character => Character.currentPv <= 0)){
            return "The fight is over"
        }
    }
}