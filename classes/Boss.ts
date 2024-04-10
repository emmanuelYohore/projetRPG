import Character from "./Character.ts";

class Boss extends Character {
    constructor(nom: string) {
        super(nom, 30, 20, 25, 150, 150,200);
    }

    attaqueDeGroupe(ennemis: Character[]): void {
        ennemis.forEach((ennemi) => {
            const degats = Math.floor((this.attaquePhysique - ennemi.defensePhysique) * 0.6);
            ennemi.perdreVie(degats);
        });
    }
}

export default Boss;