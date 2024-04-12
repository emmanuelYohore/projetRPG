import { pause } from "../GameManager.ts";
import Character from "./Character.ts";
import SpecialAttack from "./SpecialAttack.ts";

class Mage extends Character implements SpecialAttack {
    constructor(nom: string) {
        super(nom, 15, 10, 20, 100, 100,150);
        
    }

    attaqueSpecial(adversaire: Character[]): void {
       
        const ennemi = adversaire[Math.floor(Math.random() * adversaire.length)];
        const degats = this.attaquePhysique;
        ennemi.perdreVie(degats);

        console.log(`${this.nom.toUpperCase} USES MAGIC FLASH !`)
        pause(3000);
        console.log(`${this.nom.toUpperCase} INFLICTS ${degats} DAMAGE TO ${ennemi.nom}`);
        pause(3000);
    }
}

export default Mage;