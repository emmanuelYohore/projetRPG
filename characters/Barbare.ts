import Character from "./Character.ts";
import SpecialAttack from "../interface/SpecialAttack.ts";
import {pause} from "../game/GameManager.ts"

export default class Barbare extends Character implements SpecialAttack{
    constructor(name: string) {
        super(name, 25, 10, 8, 110, 110,60);
    }

    specialAttack(opponents : Character[]): void {
        const opponent = opponents[Math.floor(Math.random() * opponents.length)];
        const damage = Math.floor((this.physicAttack - opponent.physicDefence) * 1.3);
        opponent.loseHP(damage);
        const injury = Math.floor(this.maxHP * 0.2);
        this.loseHP(injury);
        console.log(`${this.name.toUpperCase()} USES BERSERK !`)
        pause(3000);
        console.log(`${this.name.toUpperCase()} ATTACKS ${opponent.name} FOR ${damage} DAMAGE !`);
        console.log(`${this.name.toUpperCase()} TAKES ${injury} DAMAGE DUE TO BERSERK !`);
        pause(3000);
    }
}