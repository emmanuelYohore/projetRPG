import Character from "./classes/Character.ts";

class Menu {
    characters: Character[];

    constructor(characters: Character[]) {
        this.characters = characters;
    }

    showActions(): void {
        console.log("---ACTIONS---\n");
        console.log("- 1 : ATTACK A MONSTER.");
        console.log("- 2 : USE SPECIAL ABILITY");
        console.log("- 3 : USE AN ITEM FROM INVENTORY.");
    }
    
    showActions2(): void {
        console.log("---ACTIONS---\n");
        console.log("- 1 : USE AN ITEM FROM INVENTORY.");
    }
    

    printCharacters() {
        console.log(`------------------------------------------------------------------------------\\\\\\-RPG GAME 2024-///------------------------------------------------------------------------------\n`)
        console.log("CHARACTERS \n");
        for (let i = 0; i < this.characters.length; i++) {
            console.log(`${i + 1}. ${this.characters[i].nom}`);
        }
    }

    chooseCharacters(): Character[] {
        let selectedCharacters: Character[] = [];
        while (selectedCharacters.length < 3) {
            this.printCharacters();
            const choice = parseInt(prompt("\nTYPE THE NUMBER OF YOUR CHOICE: ") || "0" );
            if (isNaN(choice) || choice < 1 || choice > this.characters.length) {
                console.clear()
                console.log("NOT VALIDE NUMBER. \n");
            } else {
                const selectedCharacter = this.characters[choice - 1];
                console.clear()
                console.log(`YOU CHOOSE ${selectedCharacter.nom}. ARE YOU SURE ? \n`);
                const confirmation = prompt("1- HELL YEA !      2- NOPE !");
                if (confirmation === '1') {
                    selectedCharacters.push(selectedCharacter);
                    console.clear()
                    console.log(`${selectedCharacter.nom.toUpperCase()} IS SELECTED ! \n`);
                    this.characters = this.characters.filter(item => item !== selectedCharacter);
                } else if (confirmation === '2') {
                    console.clear()
                    console.log(`YOU REJECTED ${selectedCharacter.nom}.`);
                } else {
                    console.clear()
                    console.log("WRONG ANSWER ! ITS 1 FOR \"YES\" AND 2 FOR \"NO\".");
                }
            }
            if (selectedCharacters.length === 3){
                console.clear()
                console.log(`-----\\\\YOUR TEAM//-----\n`)
                for (let i = 0; i < selectedCharacters.length; i++) {
                    console.log(`${i + 1}. ${selectedCharacters[i].nom.toUpperCase()}`);
                }
                console.log(`\nARE YOU SURE ?`);
                const confirmation2 = prompt("1- YEA !      2- NOPE !");
                if (confirmation2 === '2'){
                    console.clear()
                    selectedCharacters = []
                }
            }
        }
        console.clear();
        return selectedCharacters;
    }
}
export default Menu;
