import Character from "./Character.ts";

class Paladin extends Character {
    constructor(nom: string) {
        super(nom, 18, 18, 12, 90, 90);
    }

    attaqueSainte(equipeAdversaire: Character[]): void {
        equipeAdversaire.forEach((adversaire) => {
            const degats = Math.floor((this.attaquePhysique - adversaire.defensePhysique) * 0.4);
            adversaire.perdreVie(degats);
        });
    }
}

export default Paladin;
