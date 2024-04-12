import Character from "../classes/Character.ts";

export default interface SpecialAttack {
    attaqueSpecial(adversaire: Character[]): void
}