import Character from "./Character.ts";

class Monstre extends Character {
    constructor(nom: string) {
        super(nom, 20, 10, 15, 80, 80,90);
    }

    attaquerAleatoire(ennemis: Character[]): void {
        const adversaireAleatoire = ennemis.filter(ennemi => ennemi.pointsDeVieCourants > 0)[Math.floor(Math.random() * ennemis.length)];
        this.attaquer(adversaireAleatoire);
    }
}

export default Monstre;
