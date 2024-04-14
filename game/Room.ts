import Character from "../characters/Character.ts";
import Fight from "./Fight.ts";
import Inventory from "./Inventory.ts";
import { pause } from "./GameManager.ts"
import boss from "../ascii/Ascii.ts";

export default class Room {
    private _monsters: Character[];
    private _items: string[];
    private _inventory: Inventory;
    private _fight: Fight | null;

    constructor(monsters: Character[], items: string[]) {
        this._monsters = monsters;
        this._items = items;
        this._inventory = new Inventory();
        this._fight = null;
    }

    get monsters(): Character[] {
        return this._monsters;
    }

    set monsters(monsters: Character[]) {
        this._monsters = monsters;
    }

    get items(): string[] {
        return this._items;
    }

    set items(items: string[]) {
        this._items = items;
    }

    get inventory(): Inventory {
        return this._inventory;
    }

    set inventory(inventory: Inventory) {
        this._inventory = inventory;
    }

    get fight(): Fight | null {
        return this._fight;
    }

    set fight(fight: Fight | null) {
        this._fight = fight;
    }

    //room management method.
    public enterRoom(team: Character[]): void {
        let damage = 0;
        if (this.monsters.length === 0) {
            console.log("THIS ROOM IS EMPTY !  YOU EXPLORE IT !\n");
            pause(4000);
            console.log("YOU FOUND A BOX !\n");
            pause(3000);
            let itemFound = "";
            while (itemFound === "") {
                console.clear();
                console.log("DO YOU WANT TO OPEN THE BOX ?\n");
                const open = parseInt(prompt("\n1-YES  2-NO  :") || '0');
                if (isNaN(open) || open < 1 || open > 2) {
                    console.log("INVALIDE NUMBER !\n")
                } else if (open === 1) {
                    const objectIndex = Math.floor(Math.random() * this.items.length);
                    itemFound = this.items[objectIndex];
                    console.log(`YOU FOUND ${itemFound}`);
                    pause(3000);
                    if (itemFound === "DANGER !!! SNAKES") {
                        damage = 20;
                        this.fight = new Fight(team, this.monsters)
                        this.fight.treatmentAfterRoom(damage, itemFound);
                        console.clear();
                    }
                    if (itemFound !== "DANGER !!! SNAKES") {
                        this.fight = new Fight(team, this.monsters)
                        this.fight.treatmentAfterRoom(damage, itemFound);
                        console.clear();
                    }
                } else {
                    console.log("KEEP IT SAFE....RUN AWAY !!!")
                    itemFound = "key"
                    pause(3000);
                    console.clear();
                }
            }
        } else if (this.monsters.length === 1) {
            boss();
            console.log("\nDANGER !!! THE BOSS IS HERE \n");
            pause(6000)
            this.fight = new Fight(team, this.monsters);
            this.fight.startFight();
            if (this.fight.teamIsAlive()) {
                console.log("Room cleared!");
                return;
            }
        } else {
            console.log("DANGER !!! THREE MONSTERS APPEARS ! \n");
            pause(3000)
            this.fight = new Fight(team, this.monsters);
            this.fight.startFight();
            if (this.fight.teamIsAlive()) {
                console.log("Room cleared!");
                return;
            }
        }
    }
}