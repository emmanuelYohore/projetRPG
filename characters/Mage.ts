import { pause } from "../game/GameManager.ts";
import Character from "./Character.ts";
import SpecialAttack from "../interface/SpecialAttack.ts";

export default class Mage extends Character implements SpecialAttack {
    constructor(name: string) {
        super(name, 15, 10, 20, 100, 100,150);   
    }

    specialAttack(opponents: Character[]): void {
        const opponent = opponents[Math.floor(Math.random() * opponents.length)];
        const damage = this.physicAttack;
        opponent.loseHP(damage);
        console.log(`${this.name.toUpperCase()} USES MAGIC FLASH !`)
        pause(3000);
        console.log(`${this.name.toUpperCase()} INFLICTS ${damage} DAMAGE TO ${opponent.name}`);
        pause(3000);
    }
}