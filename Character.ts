<<<<<<< HEAD
=======
export default class Character { 
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

    simpleAttack(damage: number) {
        
            let att = damage - this.defence;
            this.currentPv -= att;
        
            if (this.currentPv <= 0) {
                this.currentPv = 0; 
                return `pv = 0`;
            } else {
                return `vous avez perdu ${damage} pv . Il vous en reste ${this.currentPv}`;
            }
        
        
    }
    
    
    healing(health : number){
        const neatCharacter = this.currentPv + health;
        if(neatCharacter >= this.maxPv){
            return `the player has been treated he is now ${this.maxPv}`
        }
        else {
            return `the player has been treated he is now ${neatCharacter}`
        }
    }

    resurrect(){
        if (this.currentPv == 0){
            this.currentPv += 50
            return `Le joueur est revenu a la vie. pv = ${this.currentPv}`
        }else{
            return `Le perso est déjà en vie`
        }
    }
}


const perso1 = new Character("test1",14,10,20,100,50)

const perso2 = new Character("perso2", 14,25,25,100,0)

perso1.simpleAttack(40)
//console.log(perso2.resurrect())
>>>>>>> emmanuel
