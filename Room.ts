import Character from "./classes/Character.ts";
import Fight from "./Fight.ts";
import Inventory from "./Inventory.ts";

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
            console.log("You entered a room with monsters!");
            this.fight = new Fight(team, this.monsters);
            this.fight.startFight();
        }
    }
}

export default Room;
