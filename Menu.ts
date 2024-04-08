import Character from "./classes/Character.ts";

class Menu {
    characters: Character[];

    constructor(characters: Character[]) {
        this.characters = characters;
    }

    printCharacters() {
        console.log("Voici les personnages disponibles :");
        for (let i = 0; i < this.characters.length; i++) {
            console.log(`${i + 1}. ${this.characters[i].nom}`);
        }
    }

    chooseCharacters(): Character[] {
        const selectedCharacters: Character[] = [];

        while (selectedCharacters.length < 3) {
            this.printCharacters();
            const choice = parseInt(prompt("Choisissez un personnage en saisissant son numéro : "));
            if (isNaN(choice) || choice < 1 || choice > this.characters.length) {
                console.log("Erreur : Veuillez saisir un nombre valide.");
            } else {
                const selectedCharacter = this.characters[choice - 1];
                if (selectedCharacters.includes(selectedCharacter)) {
                    console.log("Erreur : Vous avez déjà choisi ce personnage.");
                } else {
                    selectedCharacters.push(selectedCharacter);
                    console.log(`${selectedCharacter.nom} a été ajouté à votre équipe.`);
                }
            }
        }

        return selectedCharacters;
    }
}

export default Menu;
