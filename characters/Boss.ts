import Character from "../Character.ts"

class Boss extends Character {
    private title : string = "Boss"

    constructor(){
        super("Nkutulu", 100, 70, 10, 1000, 1000)
    }
}