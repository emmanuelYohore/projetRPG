import Character from "./Character.ts";

class Voleur extends Character {
    constructor(nom: string) {
        super(nom, 18, 12, 25, 80, 80);
    }

    volerObjet(adversaire: Character): string {
        const chance = Math.random() * 100;
        if (chance < 40) {
            return 'Rien n\'a été volé.';
        } else if (chance < 70) {
            return 'Une potion a été volée.';
        } else if (chance < 85) {
            return 'Un fragment d\'étoile a été volé.';
        } else if (chance < 95) {
            return 'Un éther a été volé.';
        } else {
            return 'Une demi-étoile a été volée.';
        }
    }
}

export default Voleur;
