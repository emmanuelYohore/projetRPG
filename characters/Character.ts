import Inventory from "../game/Inventory.ts";

export default class Character {
    private _name: string;
    private _physicAttack: number;
    private _physicDefence: number;
    private _speed: number;
    private _maxHP: number;
    private _currentHP: number;
    private _inventory: Inventory;
    private _mana: number;

    constructor(
        name: string,
        physicAttack: number,
        physicDefence: number,
        speed: number,
        maxHP: number,
        currentHP: number,
        mana: number
    ) {
        this._name = name;
        this._physicAttack = physicAttack;
        this._physicDefence = physicDefence;
        this._speed = speed;
        this._maxHP = maxHP;
        this._currentHP = currentHP;
        this._inventory = new Inventory();
        this._mana = mana;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get physicAttack(): number {
        return this._physicAttack;
    }

    set physicAttack(physicAttack: number) {
        this._physicAttack = physicAttack;
    }

    get physicDefence(): number {
        return this._physicDefence;
    }

    set physicDefence(physicDefence: number) {
        this._physicDefence = physicDefence;
    }

    get speed(): number {
        return this._speed;
    }

    set speed(speed: number) {
        this._speed = speed;
    }

    get maxHP(): number {
        return this._maxHP;
    }

    set maxHP(maxHP: number) {
        this._maxHP = maxHP;
    }


    get currentHP(): number {
        return this._currentHP;
    }

    set currentHP(currentHP: number) {
        this._currentHP = currentHP;
    }

    get inventory(): Inventory {
        return this._inventory;
    }

    set inventory(inventory: Inventory) {
        this._inventory = inventory;
    }


    get mana(): number {
        return this._mana;
    }

    set mana(mana: number) {
        this._mana = mana;
    }

    //method to manage HP lose
    public loseHP(degats: number): void {
        this._currentHP -= degats;
        if (this._currentHP < 0) {
            this._currentHP = 0;
        }
    }

    //method to manage HP gain
    public gainHP(restitution: number): void {
        this._currentHP += restitution;
        if (this._currentHP > this._maxHP) {
            this._currentHP = this._maxHP;
        }
    }
}