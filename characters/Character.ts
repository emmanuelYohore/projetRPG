import Inventory from "../game/Inventory.ts";

export default class Character {
    name: string;
    physicAttack: number;
    physicDefence: number;
    speed: number;
    maxHP: number;
    currentHP: number;
    inventory: Inventory;
    mana: number

    constructor(
        name: string,
        physicAttack: number,
        physicDefence: number,
        speed: number,
        maxHP: number,
        currentHP: number,
        mana: number
    ) {
        this.name = name;
        this.physicAttack = physicAttack;
        this.physicDefence = physicDefence;
        this.speed = speed;
        this.maxHP = maxHP;
        this.currentHP = currentHP;
        this.inventory = new Inventory();
        this.mana = mana
    }

    loseHP(degats: number): void {
        this.currentHP -= degats;
        if (this.currentHP < 0) {
            this.currentHP = 0;
        }
    }

    gainHP(restitution: number): void {
        this.currentHP += restitution;
        if (this.currentHP > this.maxHP) {
            this.currentHP = this.maxHP;
        }
    }
}