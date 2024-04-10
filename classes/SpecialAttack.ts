import Character from "./Character.ts";

export default interface SpecialAttack {
    attaqueSpecial(adversaire: Character[]): void
}