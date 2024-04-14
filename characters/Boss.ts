import Character from "./Character.ts";
import SpecialAttack from "../interface/SpecialAttack.ts";
import {pause} from "../game/GameManager.ts";

export default class Boss extends Character implements SpecialAttack{
    constructor(name: string) {
        super(name, 30, 10, 25, 500, 500, +Infinity);
    }

    specialAttack(opponents: Character[]): void {
        opponents.forEach((opponent) => {
            const damage = Math.floor((this.physicAttack - opponent.physicDefence) * 0.6);
            opponent.loseHP(damage);
            console.log(`\n${opponent.name.toUpperCase()} LOSES ${damage} HP !`)
            pause(3000);
        });
    }
}