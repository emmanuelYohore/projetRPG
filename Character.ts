class Character {
    
    name : string;
    attack : number;
    defence : number;
    speed : number;
    maxPv : number;
    currentPv : number;

    constructor(name : string, attack : number, defence : number, speed : number, maxPv : number, currentPv : number){
        this.name = name;
        this.attack = attack;
        this.defence = defence;
        this.speed = speed;
        this.maxPv = maxPv;
        this.currentPv = currentPv;
    }

    simpleAttack(){

    }

    healing(health : number){
        const neatCharacter = this.currentPv + health;
        if(neatCharacter > this.maxPv){
            console.log(`the player has been treated he is now ${this.maxPv}`)
        }
        else {
            console.log(`the player has been treated he is now ${neatCharacter}`)
        }
    }

    resurrect(){

    }
}
