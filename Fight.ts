import Character from "./classes/Character.ts";
import Barbare from "./classes/Barbare.ts"
import Inventory from "./Inventory.ts";
import Barbare from "./classes/Barbare.ts"

class Fight {
    team: Character[];
    monsters: Character[];
    turnOrder: Character[];

    constructor(team: Character[], monsters: Character[]) {
        this.team = team;
        this.monsters = monsters;
        this.turnOrder = this.calculateTurnOrder();
    }

    calculateTurnOrder(): Character[] {
        const allCharacters = this.team.concat(this.monsters);
        allCharacters.sort((a, b) => b.vitesse - a.vitesse); 
        return allCharacters;
    }

    startFight(): void {
        console.log("A fight begins!");
        let round = 1;
        while (this.teamIsAlive() && this.monstersAreAlive()) {
            console.log(`Round ${round}`);
            this.turnOrder.forEach(character => {
                if (character.pointsDeVieCourants > 0) {
                    if (this.team.includes(character)) {
                        this.playerTurn(character);
                    } else {
                        this.monstersTurn(character);
                    }
                }
            });
            round++;
        }
        console.log("The fight is over.");
    }

    playerTurn(player: Character): void {
        console.log(`${player.nom}'s (${player.pointsDeVieCourants} HP) turn:`);
        this.showActions();
    
        let actionPrompt;
        if (player instanceof Barbare) {
            actionPrompt = "Choose an action (attack/heal/item/berserk): ";
        } else {
            actionPrompt = "Choose an action (attack/heal/item): ";
        }
    
        const action = prompt(actionPrompt);
        switch (action) {
            case "attack":
                this.attack(player);
                break;
            case "heal":
                this.heal(player);
                break;
            case "item":
                this.useItem(player);
                break;
            case "berserk": 
                if (player instanceof Barbare) {
                    player.attaqueBerserk(this.monsters); 
                } else {
                    console.log("Invalid action for this character. Skipping turn.");
                }
                break;
            default:
                console.log("Invalid action. Skipping turn.");
        }
    }
    
    
    

    attack(attacker: Character): void {
        console.log(`Select target for ${attacker.nom}:`);
        this.monsters.forEach((monster, index) => {
            if (monster.pointsDeVieCourants > 0){
                console.log(`${index + 1}. ${monster.nom} (${monster.pointsDeVieCourants} HP)`);
            }       
        });
        const targetIndex = parseInt(prompt("Choose target: ")) - 1;
        if (!isNaN(targetIndex) && targetIndex >= 0 && targetIndex < this.monsters.length) {
            const target = this.monsters[targetIndex];
            const damage = attacker.attaquePhysique - target.defensePhysique;
            target.perdreVie(damage);
            console.log(`${attacker.nom} attacks ${target.nom} for ${damage} damage!`);
        } else {
            console.log("Invalid target. Turn skipped.");
        }
    }

    heal(healer: Character): void {
        const targetIndex = parseInt(prompt("Choose target for healing: ")) - 1;
        if (!isNaN(targetIndex) && targetIndex >= 0 && targetIndex < this.team.length) {
            const target = this.team[targetIndex];
            const healAmount = Math.floor(target.pointsDeVieMax * 0.25);
            target.restaurerVie(healAmount);
            console.log(`${healer.nom} heals ${target.nom} for ${healAmount} HP.`);
        } else {
            console.log("Invalid target. Turn skipped.");
        }
    }

    useItem(user: Character): void {
        console.log("Inventory:");
        user.inventory.showItems();
        const itemName = prompt("Choose an item to use: ");
        if (user.inventory.items.includes(itemName)) {
            switch (itemName) {
                case "Potion":
                    this.usePotion(user);
                    break;
                case "Elixir":
                    this.useElixir(user);
                    break;
                case "Ether":
                    this.useEther(user);
                    break;
                default:
                    console.log("Item effect not implemented.");
            }
            user.inventory.removeItem(itemName);
        } else {
            console.log("Item not found in inventory. Turn skipped.");
        }
    }

    usePotion(user: Character): void {
        const healAmount = Math.floor(user.pointsDeVieMax * 0.5);
        user.restaurerVie(healAmount);
        console.log(`//////////${user.nom} uses Potion and heals for ${healAmount} HP.`);
    }

    useElixir(user: Character): void {
        const restoreAmount = 50; // Example: Restore mana
        // Implement logic to restore mana or any other effect
        console.log(`${user.nom} uses Elixir.`);
    }

    useEther(user: Character): void {
        const restoreAmount = 50; // Example: Restore mana
        // Implement logic to restore mana or any other effect
        console.log(`${user.nom} uses Ether.`);
    }

    monstersTurn(monster: Character): void {
        console.log("Monsters' turn:");
        if (monster.pointsDeVieCourants > 0) {
            const targetIndex = Math.floor(Math.random() * this.team.length);
            const target = this.team[targetIndex];
            const damage = monster.attaquePhysique - target.defensePhysique;
            target.perdreVie(damage);
            console.log(`${monster.nom} attacks ${target.nom} for ${damage} damage!`);
        }
    }

    teamIsAlive(): boolean {
        return this.team.some(member => member.pointsDeVieCourants > 0);
    }

    monstersAreAlive(): boolean {
        return this.monsters.some(monster => monster.pointsDeVieCourants > 0);
    }

    showActions(): void {
        console.log("Actions:");
        console.log("- attack: Attack a monster.");
        console.log("- heal: Heal a team member.");
        console.log("- item: Use an item from inventory.");
        console.log("- special features: Use special features")
    }
}


export default Fight;



