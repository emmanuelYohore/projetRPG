import Character from "./Character.ts";
import SpecialAttack from "../interface/SpecialAttack.ts";
import {pause} from "../game/GameManager.ts"

export default class Barbare extends Character implements SpecialAttack{
    constructor(nom: string) {
        super(nom, 25, 10, 8, 110, 110,60);
    }

    attaqueSpecial(adversaires: Character[]): void {

        const ennemi = adversaires[Math.floor(Math.random() * adversaires.length)];
        const degats = Math.floor((this.attaquePhysique - ennemi.defensePhysique) * 1.3);
    
        
        ennemi.perdreVie(degats);
        const blessure = Math.floor(this.pointsDeVieMax * 0.2);
        this.perdreVie(blessure);

        console.log(`${this.nom.toUpperCase()} USES BERSERK !`)
        pause(3000);
        console.log(`${this.nom.toUpperCase()} ATTACKS ${ennemi.nom} FOR ${degats} DAMAGE !`);
        console.log(`${this.nom.toUpperCase()} TAKES ${blessure} DAMAGE DUE TO BERSERK !`);
        pause(3000);
    }
}