import Character from "./classes/Character.ts";
import Fight from "./Fight.ts";
import Inventory from "./Inventory.ts";
import {pause} from "./GameManager.ts"

class Room {
    monsters: Character[];
    items: string[];
    inventory: Inventory;
    fight: Fight | null;

    constructor(monsters: Character[], items: string[]) {
        this.monsters = monsters;
        this.items = items;
        this.inventory = new Inventory();
        this.fight = null;
    }

    enterRoom(team: Character[]): void {
        if (this.monsters.length === 0) {
            console.log("This room is empty. You explore it and find some items.");
            this.items.forEach(item => {
                console.log(`You found: ${item}`);
                this.inventory.addItem(item);
            });
        } else {
            console.log("DANGER !!! TWO MONSTERS APPEARS ! \n");
            pause(3000)
            this.fight = new Fight(team, this.monsters);
            this.fight.startFight();
            // After the fight, check if the team is still alive and move to the next room if possible
            if (this.fight.teamIsAlive()) {
                console.log("Room cleared!");
                return; // Exit function if the team is alive
            }
        }
    }
}

export default Room;
