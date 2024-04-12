import Character from "./classes/Character.ts";
import Fight from "./Fight.ts";
import Inventory from "./Inventory.ts";
import {pause} from "./GameManager.ts"
import boss from "./ascii.ts";

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
        let damage = 0;
        if (this.monsters.length === 0) {
            console.log("THIS ROOM IS EMPTY !  YOU EXPLORE IT !\n");
            pause(4000);
            console.log("YOU FOUND A BOX !\n");
            pause(3000);
            let itemFound = "";
            while(itemFound === ""){
                console.clear();
                console.log("DO YOU WANT TO OPEN THE BOX ?\n");
                const open = parseInt(prompt("\n1-YES  2-NO  :") || '0');
                if(isNaN(open) || open < 1 || open > 2){
                    console.log("INVALIDE NUMBER !\n")
                } else if (open === 1){
                    const objectIndex = Math.floor(Math.random() * this.items.length);
                    itemFound = this.items[objectIndex];
                    console.log(`YOU FOUND ${itemFound}`);
                    pause(3000);
                    if (itemFound === "DANGER !!! SNAKES"){
                        damage = 20;
                        this.fight = new Fight(team, this.monsters)
                        this.fight.treatmentAfterRoom(damage, itemFound);
                        console.clear();
                    } 
                    if(itemFound !== "DANGER !!! SNAKES"){
                        this.fight = new Fight(team, this.monsters)
                        this.fight.treatmentAfterRoom(damage, itemFound);
                        console.clear();
                    }
                } else {
                    console.log("KEEP IT SAFE....RUN AWAY !!!")
                    pause(3000);
                    console.clear();
                } 
            }     
        } else if(this.monsters.length === 1) {
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
            console.log("DANGER !!! TWO MONSTERS APPEARS ! \n");
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

export default Room;
