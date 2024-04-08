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


    /* choice() {
        this.printPerso();
        let choix = parseInt(prompt("Choisissez un nombre entre 1 et 6 : "));
        if (isNaN(choix) || choix < 1 || choix > 6) {
            console.log("Erreur : Veuillez saisir un nombre entre 1 et 6.");
            this.choice();
        } else {
            let confirmChoice = prompt("Confirmer votre choix : 'ok', 'non'");
            if (confirmChoice === "ok") {
                this.persoC.push(this.perso[choix - 1]);
                console.log(`Vous avez choisi ${this.persoC.join(', ')}`);
            } else if (confirmChoice === "non") {
                this.choice();
            } else {
                console.log("Choisissez une option valide.");
                this.choice();
                confirmChoice = prompt("Confirmer votre choix : 'ok', 'non'");

            }
        }
    }
}
    */

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
                console.log(`Vous avez choisi ${selectedCharacter.nom}. Confirmez-vous ce choix ? (oui/non)`);
                const confirmation = prompt("").toLowerCase();
                if (confirmation === 'oui') {
                    selectedCharacters.push(selectedCharacter);
                    console.log(`${selectedCharacter.nom} a été ajouté à votre équipe.`);
                } else if (confirmation === 'non') {
                    console.log(`Vous avez annulé la sélection de ${selectedCharacter.nom}.`);
                } else {
                    console.log("Erreur : Réponse non valide. Veuillez répondre par 'oui' ou 'non'.");
                }
            }
        }
    }

    return selectedCharacters;
}

}

export default Menu;
