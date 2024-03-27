import Character from "../Character.ts"

class Voleur extends Character {
    private title : string = "voleur"

    constructor(){
        super("Ali Baba", 20, 20, 60, 50, 50)
    }
}

const voleur = new Voleur()
console.log(voleur)