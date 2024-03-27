import Character from "../Character.ts"

class monstre extends Character {
    private title : string = "monstre"

    getTitle(): string {
        return this.title;
    }
}