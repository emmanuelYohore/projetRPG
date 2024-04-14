import Character from "./Character.ts";

export default class Guerrier extends Character {
    constructor(name : string) {
        super(name, 20, 15, 10, 100, 100,0);
    }
}