import Character from "./Character.ts";

class Barbare extends Character {
    constructor(nom: string) {
        super(nom, 25, 10, 8, 110, 110);
    }

    attaqueBerserk(adversaire: Character): void {
        const degats = Math.floor((this.attaquePhysique - adversaire.defensePhysique) * 1.3);
        adversaire.perdreVie(degats);
        const blessure = Math.floor(this.pointsDeVieMax * 0.2);
        this.perdreVie(blessure);
    }
}

export default Barbare;
