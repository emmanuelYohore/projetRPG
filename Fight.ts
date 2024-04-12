import Character from "./classes/Character.ts";
import {pause} from "./GameManager.ts";
import Barbare from "./classes/Barbare.ts";
import Mage from "./classes/Mage.ts";
import Paladin from "./classes/Paladin.ts";
import Pretre from "./classes/Pretre.ts";
import Voleur from "./classes/Voleur.ts";
import Menu from "./Menu.ts";
import Monstre from "./classes/Monstre.ts";
import Boss from "./classes/Boss.ts"

class Fight {
    team: Character[];
    monsters: Character[];
    turnOrder: Character[];
    menu: Menu;

    constructor(team: Character[], monsters: Character[]) {
        this.team = team;
        this.monsters = monsters;
        this.turnOrder = this.calculateTurnOrder();
        this.menu = new Menu([])
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
                    console.log("\nNEXT STEP !");
                    pause(3000);
            }
        }
        console.log("THE FIGHT IS OVER.");
    }

    playerTurn(player: Character): void {
        if(player.pointsDeVieCourants > 0 ){
            console.clear()
            console.log('\x1b[32m%s\x1b[0m',`TURN OF ----> ${player.nom.toUpperCase()}(${player.pointsDeVieCourants}HP)----MANA${player.mana}\n`);
            this.menu.showActions()
            const action = parseInt(prompt("\nYOUR CHOICE : ") || '0');
            switch (action) {
                case 1:
                    console.clear()
                    this.attack(player);
                    break;
                case 2:
                    if(player.mana < 30){
                        console.log(`PLAYER ${player.nom.toUpperCase()} HAS NOT ENOUGH MANA TO DO HIS SPECIAL...TURN SKIPPED !`);
                    } else {
                        if (player instanceof Barbare) {
                            player.attaqueSpecial(this.monsters); 
                            player.mana -= 30;
                        } else if (player instanceof Mage){
                            player.attaqueSpecial(this.monsters);
                            player.mana -= 30;
                        }  else if(player instanceof Pretre) {
                            player.attaqueSpecial(this.team)
                            player.mana -= 30
                        } else if (player instanceof Voleur){
                            const targetIndex = Math.floor(Math.random() * this.monsters.length);
                            const target = this.monsters[targetIndex];
                            player.vol(target);
                            player.mana -= 30;
                        } else if (player instanceof Paladin) {
                            player.attaqueSpecial(this.monsters); 
                            player.mana -= 30;
                        }else if(player instanceof Pretre) {
                            player.attaqueSpecial(this.team)
                            player.mana -= 30
                        } else if(player instanceof Voleur) {
                            const targetIndex = Math.floor(Math.random() * this.monsters.length);
                            const target = this.monsters[targetIndex];
                            player.vol(target);
                            player.mana -= 30;
                        } else {
                            console.log(`NO SPECIAL ABILITY FOR ${player.nom.toUpperCase()}. TURN SKIPPED !`);
                            pause(5000);
                        }
                    }
                    break;
                case 3:
                    console.clear()
                    this.useItem(player);
                    break;
                default:
                    console.log("INVALID ACTION. SKIPPING TURN.");
            }
        } else if(player.pointsDeVieCourants <= 0 && player.inventory.items.length !== 0){
            console.log("\x1b[33m%s\x1b[0m",`TURN OF ----> ${player.nom.toUpperCase()}(${player.pointsDeVieCourants}HP)----MANA${player.mana}\n`);
            this.menu.showActions2();
            const action = parseInt(prompt("\nYOUR CHOICE : ") || '0');;
            switch (action) {
                case 1:
                    this.useItem(player);
                    break;
                default:
                    console.log("INVALID ACTION. SKIPPING TURN.");
            }
        } else {
            console.log(`${player.nom} CAN'T DO ANYTHING ! HE IS DEAD !`)
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

    useItem(user: Character): void {
        console.log("INVENTORY: ");
        user.inventory.showItems();
        const itemName : string = prompt("CHOOSE AN ITEM TO USE: ");
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
                    console.log("ITEM EFFECT NOT IMPLEMENTED.");
            }
            user.inventory.removeItem(itemName);
        } else {
            console.log("ITEM NOT FOUND IN INVENTORY. TTURN SKIPPED.");
        }
    }

    usePotion(user: Character): void {
        if (user.pointsDeVieCourants > 0){
            const healAmount = Math.floor(user.pointsDeVieMax * 0.5);
            user.restaurerVie(healAmount);
            console.log(`//////////${user.nom} USES POTION AND HEALS FOR ${healAmount} HP.`);
            pause(3000);
        } else {
            console.log(`BRO, YOU ARE DEAD YOU CAN ONLY USE STARPIECE OR MIDSTAR TO RESURECT`);
            pause(5000);
            console.log(`YOU LOSE POTION ! TURN SKIPPED`);
            pause(3000);
        }
       
    }

    useStarPiece(user: Character): void {
        const restoreAmount = Math.floor(user.pointsDeVieMax * 0.2);
        const healAmount2 = Math.floor(user.pointsDeVieMax * 0.5);
        if(user.pointsDeVieCourants <= 0 ){
            console.log(`//////////${user.nom.toUpperCase()} USES STARPIECE TO RESURECT AND GAIN ${restoreAmount} % OF HIS HP !`);
            user.restaurerVie(restoreAmount)
            pause(2000);
        } else {
            user.restaurerVie(healAmount2)
            console.log(`//////////${user.nom} USES STARPIECE AND GAIN ${healAmount2} % OF HIS HP !`)
            pause(2000);
        }
    }

    useMidStar(user: Character): void {
        const restoreAmount2 = user.pointsDeVieMax;
        const healAmount3 = user.pointsDeVieMax - user.pointsDeVieCourants;
        if(user.pointsDeVieCourants <= 0 ){
            console.log(`//////////${user.nom} USES MIDSTAR TO RESURECT WITH HIS FULL HP !`);
            user.restaurerVie(restoreAmount2)
        } else {
            user.restaurerVie(healAmount3)
            console.log(`//////////${user.nom.toUpperCase()} USES STARPIECE AND RECOVER HIS FULL HP !`)
        }
    }

    useEther(user: Character): void {
        user.mana += 30;
        console.log(`${user.nom.toUpperCase()} USES ETHER !\n`)
        pause(3000);
        console.log(`CURRENT MANA OF ${user.nom.toUpperCase()} = ${user.mana} !`)
        pause(3000);
    }

    monstersTurn(monster: Character): void {
        console.log('\x1b[31m%s\x1b[0m',`TURN OF ----> ${monster.nom.toUpperCase()}(${monster.pointsDeVieCourants}HP)\n`);
        if (monster instanceof Monstre){
            const targetIndex = Math.floor(Math.random() * this.team.length);
            const target = this.team[targetIndex];
            const damage = monster.attaquePhysique - target.defensePhysique;
            target.perdreVie(damage);
            console.log('\x1b[31m%s\x1b[0m',`${monster.nom.toUpperCase()} ATTACKS ${target.nom.toUpperCase()} FOR ${damage} DAMAGE!\n`);
            pause(3000);
        } else {
            const actionChance = Math.floor(Math.random() * 100);
            if(actionChance <= 70){
                const targetIndex = Math.floor(Math.random() * this.team.length);
                const target = this.team[targetIndex];
                const damage = monster.attaquePhysique - target.defensePhysique;
                target.perdreVie(damage);
                console.log('\x1b[31m%s\x1b[0m',`${monster.nom.toUpperCase()} ATTACKS ${target.nom.toUpperCase()} FOR ${damage} DAMAGE!\n`);
                pause(3000);
            } else {
                console.log('\x1b[31m%s\x1b[0m',`${monster.nom.toUpperCase()} USES END OF THE WORD ! BEWARE !!!`)
                pause(5000);
                if (monster instanceof Boss) {
                    monster.attaqueSpecial(this.team);
                }        
            }
        }    
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

    
    

    treatmentAfterRoom(damage : number, item : string): void {
        if(item === "DANGER !!! SNAKES"){
            this.team.forEach(member => {
                member.pointsDeVieCourants = member.pointsDeVieCourants - damage;
                console.log(`${member.nom.toUpperCase()} LOSE ${damage}HP ! --- CURRENT HP:${member.pointsDeVieCourants}`)
            });
            pause(5000);
        } else {
            this.team.forEach(member => {
                member.inventory.addItem(item)
            });
            console.log(`${item} ADDED !`)
            pause(5000);
        }
    }
}

export default Fight;
