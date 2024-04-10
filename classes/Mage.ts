import Character from "./Character.ts";
import SpecialAttack from "./SpecialAttack.ts";

class Mage extends Character implements SpecialAttack {
    

    constructor(nom: string) {
        super(nom, 15, 10, 20, 100, 100,90);
        
    }

    attaqueSpecial(adversaire: Character[]): void {
       
        const ennemi = adversaire[Math.floor(Math.random() * adversaire.length)];
        const degats = this.attaquePhysique;
        ennemi.perdreVie(degats);
        console.log(`${this.nom} inflige ${degats} dégâts à ${ennemi.nom}`);
    }
}

export default Mage;
