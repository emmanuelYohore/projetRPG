import Character from "./Character.ts";
import SpecialAttack from "../interface/SpecialAttack.ts";
import {pause} from "../game/GameManager.ts"

export default class Paladin extends Character implements SpecialAttack {
    constructor(name: string) {
        super(name, 18, 18, 12, 100, 100, 90);
    }

    specialAttack(opponents: Character[]): void {
        opponents.forEach(opponent => {
            const damage = Math.max(0, Math.floor((this.physicAttack - opponent.physicDefence) * 0.4));
            opponent.loseHP(damage);
            console.log(`${this.name.toUpperCase()} USES SANCTIFICATION !`)
            pause(3000);
            console.log(`${this.name.toUpperCase()} INFLICTS ${damage} DAMAGE TO ${opponent.name}`);
            pause(3000);
        });
    }
}