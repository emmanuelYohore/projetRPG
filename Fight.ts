import Character from "./classes/Character.ts";
import Inventory from "./Inventory.ts";

class Fight {
    team: Character[];
    monsters: Character[];

    constructor(team: Character[], monsters: Character[]) {
        this.team = team;
        this.monsters = monsters;
    }

    startFight(): void {
        console.log("A fight begins!");
        while (this.teamIsAlive() && this.monstersAreAlive()) {
            this.playerTurn();
            if (this.monstersAreAlive()) {
                this.monstersTurn();
                
            }
        }
        console.log("The fight is over.");
    }

    playerTurn(): void {
        console.log("Your turn:");
        this.team.forEach(member => {
            if (member.pointsDeVieCourants > 0) {
                console.log(`${member.nom}'s turn.`);
                this.showActions();
                const action = prompt("Choose an action (attack/heal/item): ");
                switch (action) {
                    case "attack":
                        this.attack(member);
                        break;
                    case "heal":
                        this.heal(member);
                        break;
                    case "item":
                        this.useItem(member);
                        break;
                    default:
                        console.log("Invalid action. Skipping turn.");
                }
            }
        });
    }

    attack(attacker: Character): void {
        console.log(`pv= ${attacker.pointsDeVieCourants}`)
        
        console.log(`Select target for ${attacker.nom}:`);
        this.monsters.forEach((monster, index) => {
            console.log(`${index + 1}. ${monster.nom} (${monster.pointsDeVieCourants} HP)`);
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
            // Implement item effects here
            console.log(`${user.nom} uses ${itemName}.`);
            user.inventory.removeItem(itemName);
        } else {
            console.log("Item not found in inventory. Turn skipped.");
        }
    }

    monstersTurn(): void {
        console.log("Monsters' turn:");
        this.monsters.forEach(monster => {
            if (monster.pointsDeVieCourants > 0) {
                const targetIndex = Math.floor(Math.random() * this.team.length);
                const target = this.team[targetIndex];
                const damage = monster.attaquePhysique - target.defensePhysique;
                target.perdreVie(damage);
                console.log(`${monster.nom} attacks ${target.nom} for ${damage} damage!`);
           
            }
        });
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
        
        
        
    }
}

export default Fight;
