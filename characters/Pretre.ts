import { pause } from "../game/GameManager.ts";
import Character from "./Character.ts";
import SpecialAttack from "../interface/SpecialAttack.ts";

export default class Pretre extends Character implements SpecialAttack {
    constructor(name: string) {
        super(name, 15, 8, 15, 70, 70, 90);
    }

    specialAttack(teamMates: Character[]): void {
        let recover: number; 
        console.log(`${this.name.toUpperCase()} USES HEALING !`)
        pause(3000);
        for (const teamMate of teamMates){
            recover = Math.floor(teamMate.maxHP * 0.25)
            const recover2 = teamMate.maxHP - teamMate.currentHP
            teamMate.currentHP += recover
            if (teamMate.currentHP >= teamMate.maxHP) {
                teamMate.currentHP = teamMate.maxHP
                console.log(` ${teamMate.name.toUpperCase()} RECOVERS ${recover2} HP ! HIS LIFE IS ${teamMate.currentHP}` )
                pause(3000)
            } else if (teamMate.currentHP <= 0){
                teamMate.currentHP = 0
                console.log(`IMPOSSIBLE BECAUSE ${teamMate.name.toUpperCase()} IS DEAD`)
                pause(3000)
            } else{
                console.log(` ${teamMate.name.toUpperCase()} RECOVERS ${recover} HP! HIS LIFE IS ${teamMate.currentHP}`)
                pause(3000)
            }          
        }           
    }
}