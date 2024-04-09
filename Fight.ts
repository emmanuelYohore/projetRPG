import Character from "./classes/Character.ts";
import {pause} from "./GameManager.ts"

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
        console.log("A FIGHT BEGINS !");
        console.clear()
        let round = 1;
        while (this.teamIsAlive() && this.monstersAreAlive()) {
            console.clear();
            console.log(`******ROUND ${round}****** \n`);;
            pause(3000);
            this.turnOrder.forEach(character => {
                if (this.team.length !==0 && this.monsters.length !== 0){
                    if (character.pointsDeVieCourants > 0 ) {
                        if (this.team.includes(character)) {
                            this.playerTurn(character);
                        } else {
                            this.monstersTurn(character);
                        }
                    } else if(this.team.includes(character)){
                        this.playerTurn(character);
                    }
                }  
            });
            round++;
            console.clear()
            console.log(`--------------//-RECAP ROUND ${round - 1}-\\\\-------------`)
            this.turnOrder.forEach(character => {
                console.log(`${character.nom}  :  HP ${character.pointsDeVieCourants}`)
            })
            console.log(`\n \n`)
            const next = parseInt(prompt("CONTINUE ?          (anything)- YEA !     1-SURRENDER : ") || '0')
            switch (next) {
                case 1:
                    console.log(`CLOSING GAME----------------`);
                    pause(3000);
                    Deno.exit();
                    break; 
                default:
                    console.log("\n :)   NEXT STEP !");
                    pause(3000);
            }
        }
        console.log("The fight is over.");
    }

    playerTurn(player: Character): void {
        if(player.pointsDeVieCourants > 0 ){
            console.clear()
            console.log('\x1b[32m%s\x1b[0m',`TURN OF ----> ${player.nom.toUpperCase()}(${player.pointsDeVieCourants}HP)\n`);
            this.showActions();
            const action = parseInt(prompt("\nYOUR CHOICE : ") || '0');
            switch (action) {
                case 1:
                    console.clear()
                    this.attack(player);
                    break;
                case 2:
                    console.clear()
                    this.heal(player);
                    break;
                case 3:
                    console.clear()
                    this.useItem(player);
                    break;
                default:
                    console.log("Invalid action. Skipping turn.");
            }
        } else if(player.pointsDeVieCourants <= 0 && player.inventory.items.length !== 0){
            this.showActions2();
            const action = parseInt(prompt("\nYOUR CHOICE : ") || '0');;
            switch (action) {
                case 1:
                    this.heal(player);
                    break;
                case 2:
                    this.useItem(player);
                    break;
                default:
                    console.log("Invalid action. Skipping turn.");
            }
        } else {
            console.log(`${player.nom} can't do anything ! he is dead !`)
            this.team = this.team.filter(item => item !== player)
        }   
    }

    attack(attacker: Character): void {
        console.log(`SELECT TARGET FOR ${attacker.nom.toUpperCase()}: \n`);
        this.monsters.forEach((monster, index) => {
            console.log(`${index + 1}. ${monster.nom} (${monster.pointsDeVieCourants} HP)`);   
        });
        const targetIndex = parseInt((prompt("\nTARGET: ")) || '0') - 1;
        console.clear()
        if (!isNaN(targetIndex) && targetIndex >= 0 && targetIndex < this.monsters.length) {
            const target = this.monsters[targetIndex];
            const damage = attacker.attaquePhysique - target.defensePhysique;
            target.perdreVie(damage);
            console.log('\x1b[32m%s\x1b[0m',`${attacker.nom.toUpperCase()} ATTACKS ${target.nom.toUpperCase()} FOR ${damage} DAMAGE!`)
            pause(2000);
            if(target.pointsDeVieCourants <= 0) {
                console.log(`${target.nom} IS DEAD.`)
                pause(4000);
                this.monsters = this.monsters.filter(item => item !== target)
            }
        } else {
            console.log("\nINVALID TARGET !    TURN SKIPPED !");
            pause(2000);
        }
        console.clear()
    }

    heal(healer: Character): void {
        const targetIndex = parseInt(prompt("Choose target for healing: ") || '0') - 1;
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
        const itemName : string = prompt("Choose an item to use: ");
        if (user.inventory.items.includes(itemName)) {
            switch (itemName) {
                case "Potion":
                    this.usePotion(user);
                    break;
                case "StarPiece":
                    this.useStarPiece(user);
                    break;
                case "MidStar":
                    this.useMidStar(user);
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

    useStarPiece(user: Character): void {
        const restoreAmount = Math.floor(user.pointsDeVieMax * 0.2);
        const healAmount2 = Math.floor(user.pointsDeVieMax * 0.5);
        if(user.pointsDeVieCourants <= 0 ){
            console.log(`//////////${user.nom} uses StarPiece to resurect and gain ${restoreAmount} % of his HP`);
            user.restaurerVie(restoreAmount)
        } else {
            user.restaurerVie(healAmount2)
            console.log(`//////////${user.nom} uses StarPiece and gain ${healAmount2} % of his HP`)
        }
    }

    useMidStar(user: Character): void {
        const restoreAmount2 = user.pointsDeVieMax;
        const healAmount3 = user.pointsDeVieMax - user.pointsDeVieCourants;
        if(user.pointsDeVieCourants <= 0 ){
            console.log(`//////////${user.nom} uses MidStar to resurect with his full HP !`);
            user.restaurerVie(restoreAmount2)
        } else {
            user.restaurerVie(healAmount3)
            console.log(`//////////${user.nom} uses StarPiece and recover his full HP !`)
        }
    }

    useEther(user: Character): void {
        const restoreAmount = 50; // Example: Restore mana
        // Implement logic to restore mana or any other effect
        console.log(`${user.nom} uses Ether.`);
    }

    monstersTurn(monster: Character): void {
        console.log('\x1b[31m%s\x1b[0m',`TURN OF ----> ${monster.nom.toUpperCase()}(${monster.pointsDeVieCourants}HP)\n`);
        const targetIndex = Math.floor(Math.random() * this.team.length);
        const target = this.team[targetIndex];
        const damage = monster.attaquePhysique - target.defensePhysique;
        target.perdreVie(damage);
        console.log('\x1b[31m%s\x1b[0m',`${monster.nom.toUpperCase()} ATTACKS ${target.nom.toUpperCase()} FOR ${damage} DAMAGE!\n`);
        pause(3000);
    }

    teamIsAlive(): boolean {
        if(this.team.length !== 0){
            return true;
        } else {
            return false;
        }
    }

    monstersAreAlive(): boolean {
        if(this.monsters.length !== 0){
            return true;
        } else {
            return false;
        }
    }

    showActions(): void {
        console.log("---ACTIONS---\n");
        console.log("- 1 : Attack a monster.");
        console.log("- 2 : Heal a team member.");
        console.log("- 3 : Use an item from inventory.");
    }
    showActions2(): void {
        console.log("---ACTIONS---\n");
        console.log("- 1 : Heal a team member.");
        console.log("- 2 : Use an item from inventory.");
    }
}

export default Fight;
