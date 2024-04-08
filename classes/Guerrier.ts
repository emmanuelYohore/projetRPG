import Character from "./Character.ts";

class Guerrier extends Character {
    constructor(nom: string) {
        super(nom, 20, 15, 10, 100, 100);
    }
}

export default Guerrier;
