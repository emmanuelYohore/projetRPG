import Character from "./Character.ts";
import SpecialAttack from "../interface/SpecialAttack.ts";
import {pause} from "../game/GameManager.ts";

class Boss extends Character implements SpecialAttack{
    constructor(nom: string) {
        super(nom, 30, 10, 25, 500, 500,0);
    }

    attaqueSpecial(ennemis: Character[]): void {
        ennemis.forEach((ennemi) => {
            const degats = Math.floor((this.attaquePhysique - ennemi.defensePhysique) * 0.6);
            ennemi.perdreVie(degats);
            console.log(`\n${ennemi.nom.toUpperCase()} LOSES ${degats} HP !`)
            pause(3000);
        });
    }
}

export default Boss;