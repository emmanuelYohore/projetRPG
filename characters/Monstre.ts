import Character from "./Character.ts";

export default class Monstre extends Character {
    constructor(name: string) {
        super(name, 20, 10, 15, 80, 80,0);
    }
}