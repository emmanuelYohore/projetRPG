import Character from "./Character.ts";

class Mage extends Character {
    mana: number;

    constructor(nom: string) {
        super(nom, 15, 10, 20, 100, 100);
        this.mana = 100;
    }

    attaqueMagique(adversaire: Character): void {
        if (this.mana >= 20) {
            const degats = 20; // Exemple de dégâts magiques
            adversaire.perdreVie(degats);
            this.mana -= 20;
        } else {
            console.log('Pas assez de mana');
        }
    }
}

export default Mage;
