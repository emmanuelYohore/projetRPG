import Character from "./Character.ts";

class Fight extends Character{

    players : string[];
    monsters : string[];

    constructor(name : string, attack : number, defence : number, speed : number, maxPv : number, currentPv : number, players : string[], monsters : string[]){
        super(name, attack, defence, speed, maxPv, currentPv);
        this.players = players;
        this.monsters = monsters;
    }

    orderOfTurns(){
        
    }
}