import Character from "./Character.ts";
import SpecialAttack from "./SpecialAttack.ts";
import {pause} from "../GameManager.ts"

export default class Barbare extends Character implements SpecialAttack{
    constructor(nom: string) {
        super(nom, 25, 10, 8, 110, 110,90);
    }

    attaqueSpecial(adversaires: Character[]): void {
        
        const ennemi = adversaires[Math.floor(Math.random() * adversaires.length)];
        const degats = Math.floor((this.attaquePhysique - ennemi.defensePhysique) * 1.3);
    
        
        ennemi.perdreVie(degats);
        const blessure = Math.floor(this.pointsDeVieMax * 0.2);
        this.perdreVie(blessure);
        
        console.log(`${this.nom} attacks ${ennemi.nom} for ${degats} damage!`);
        console.log(`${this.nom} takes ${blessure} damage due to Berserk!`);
        pause(5000);
    }
}