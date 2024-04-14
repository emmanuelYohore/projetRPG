import Character from "../characters/Character.ts";

export default interface SpecialAttack {
    specialAttack(adversaire: Character[]): void
}