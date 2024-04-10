import Character from "./Character.ts";
import SpecialAttack from "./SpecialAttack.ts";

class Paladin extends Character implements SpecialAttack {
    constructor(nom: string) {
        super(nom, 18, 18, 12, 100, 100, 90);
    }

    attaqueSpecial(adversaires: Character[]): void {
        adversaires.forEach(adversaire => {
            const degats = Math.max(0, Math.floor((this.attaquePhysique - adversaire.defensePhysique) * 0.4));
            adversaire.perdreVie(degats);
            console.log(`${this.nom} inflige ${degats} dégâts à ${adversaire.nom}`);
        });
    }
    
    
}

export default Paladin;
