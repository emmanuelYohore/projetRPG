import Character from "../characters/Character.ts";

export default class Menu {
    private _characters: Character[];

    constructor(characters: Character[]) {
        this._characters = characters;
    }

    get characters(): Character[] {
        return this._characters;
    }

    set characters(characters: Character[]) {
        this._characters = characters;
    }

    //actions for a healthy character
    public showActions(): void {
        console.log("---ACTIONS---\n");
        console.log("- 1 : ATTACK A MONSTER.");
        console.log("\n- 2 : USE SPECIAL ABILITY");
        console.log("\n- 3 : USE AN ITEM FROM INVENTORY.");
    }
    
    //actions for a dead character.
    public showActions2(): void {
        console.log("---ACTIONS---\n");
        console.log("- 1 : USE AN ITEM FROM INVENTORY.");
    }
    
    private printCharacters() {
        console.log(`------------------------------------------------------------------------------\\\\\\-RPG GAME 2024-///------------------------------------------------------------------------------\n`)
        console.log("CHARACTERS \n");
        for (let i = 0; i < this.characters.length; i++) {
            console.log(`\n${i + 1}. ${this.characters[i].name}   SPEED : ${this.characters[i].speed}     HP : ${this.characters[i].maxHP}    MANA : ${this.characters[i].mana}`);
        }
    }

    //method to choose the characters at the start of the game.
    public chooseCharacters(): Character[] {
        let selectedCharacters: Character[] = [];
        while (selectedCharacters.length < 3) {
            this.printCharacters();
            const choice = parseInt(prompt("\nTYPE THE NUMBER OF YOUR CHARACTER OF CHOICE: ") || "0" );
            if (isNaN(choice) || choice < 1 || choice > this.characters.length) {
                console.clear()
                console.log("NOT VALIDE NUMBER. \n");
            } else {
                const selectedCharacter = this.characters[choice - 1];
                console.clear()
                console.log(`YOU CHOOSE ${selectedCharacter.name}. ARE YOU SURE ? \n`);
                const confirmation = prompt("1- YEA !      2- NOPE !");
                if (confirmation === '1') {
                    selectedCharacters.push(selectedCharacter);
                    console.clear()
                    console.log(`${selectedCharacter.name.toUpperCase()} IS SELECTED ! \n`);
                    this.characters = this.characters.filter(item => item !== selectedCharacter);
                } else if (confirmation === '2') {
                    console.clear()
                    console.log(`YOU REJECTED ${selectedCharacter.name}.`);
                } else {
                    console.clear()
                    console.log("WRONG ANSWER ! ITS 1 FOR \"YES\" AND 2 FOR \"NO\".");
                }
            }
            if (selectedCharacters.length === 3){
                console.clear()
                console.log(`-----\\\\YOUR TEAM//-----\n`)
                for (let i = 0; i < selectedCharacters.length; i++) {
                    console.log(`${i + 1}. ${selectedCharacters[i].name.toUpperCase()}`);
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