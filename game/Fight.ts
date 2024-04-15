import Character from "../characters/Character.ts";
import { pause } from "./GameManager.ts";
import Barbare from "../characters/Barbare.ts";
import Mage from "../characters/Mage.ts";
import Paladin from "../characters/Paladin.ts";
import Pretre from "../characters/Pretre.ts";
import Voleur from "../characters/Voleur.ts";
import Menu from "./Menu.ts";
import Monstre from "../characters/Monstre.ts";
import Boss from "../characters/Boss.ts";

export default class Fight {
    private _team: Character[];
    private _monsters: Character[];
    private _turnOrder: Character[];
    private _menu: Menu;

    constructor(team: Character[], monsters: Character[]) {
        this._team = team;
        this._monsters = monsters;
        this._turnOrder = this.calculateTurnOrder();
        this._menu = new Menu([]);
    }

    get team(): Character[] {
        return this._team;
    }

    set team(team: Character[]) {
        this._team = team;
    }

    get monsters(): Character[] {
        return this._monsters;
    }

    set monsters(monsters: Character[]) {
        this._monsters = monsters;
    }

    get turnOrder(): Character[] {
        return this._turnOrder;
    }

    set turnOrder(turnOrder: Character[]) {
        this._turnOrder = turnOrder;
    }

    get menu(): Menu {
        return this._menu;
    }

    set menu(menu: Menu) {
        this._menu = menu;
    }

    //sort characters by speed
    private calculateTurnOrder(): Character[] {
        const allCharacters = this.team.concat(this.monsters);
        allCharacters.sort((a, b) => b.speed - a.speed);
        return allCharacters;
    }

    //determine the turn of each player based on the speed and start the fight
    public startFight(): void {
        console.log("A FIGHT BEGINS !");
        console.clear()
        let round = 1;
        while (this.teamIsAlive() && this.monstersAreAlive()) {
            console.clear();
            console.log(`******ROUND ${round}****** \n`);;
            pause(3000);
            this.turnOrder.forEach(character => {
                if (this.team.length !==0 && this.monsters.length !== 0){
                    if (character.currentHP > 0 ) {
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
                console.log(`${character.name.toUpperCase()}  :  HP ${character.currentHP}    MANA ${character.mana}`)
            })
            console.log(`\n \n`)
            const next = parseInt(prompt("CONTINUE ?          2-NO....SURRENDER    (anything)- YEA !     : ") || '0')
            switch (next) {
                case 2:
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

    //manage your team turn
    private playerTurn(player: Character): void {
        if(player.currentHP > 0 ){
            console.clear()
            console.log('\x1b[32m%s\x1b[0m',`TURN OF ----> ${player.name.toUpperCase()}(${player.currentHP}HP)----MANA${player.mana}\n`);
            this.menu.showActions()
            const action = parseInt(prompt("\nYOUR CHOICE : ") || '0');
            switch (action) {
                case 1:
                    console.clear()
                    this.attack(player);
                    break;
                case 2:
                    if(player.mana < 30){
                        console.log(`PLAYER ${player.name.toUpperCase()} HAS NOT ENOUGH MANA TO DO HIS SPECIAL...TURN SKIPPED !`);
                    } else {
                        if (player instanceof Barbare) {
                            player.specialAttack(this.monsters); 
                            player.mana -= 30;
                            console.clear()
                        } else if (player instanceof Mage){
                            player.specialAttack(this.monsters);
                            player.mana -= 30;
                            console.clear()
                        }  else if(player instanceof Pretre) {
                            player.specialAttack(this.team)
                            player.mana -= 30
                            console.clear()
                        } else if (player instanceof Voleur){
                            const targetIndex = Math.floor(Math.random() * this.monsters.length);
                            const target = this.monsters[targetIndex];
                            player.steal(target);
                            player.mana -= 30;
                            console.clear()
                        } else if (player instanceof Paladin) {
                            player.specialAttack(this.monsters); 
                            player.mana -= 30;
                            console.clear()
                        } else {
                            console.log(`NO SPECIAL ABILITY FOR ${player.name.toUpperCase()}. TURN SKIPPED !`);
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
        } else if(player.currentHP <= 0 && player.inventory.items.length !== 0){
            console.log("\x1b[33m%s\x1b[0m",`TURN OF ----> ${player.name.toUpperCase()}(${player.currentHP}HP)----MANA${player.mana}\n`);
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
            console.log(`${player.name} CAN'T DO ANYTHING ! HE IS DEAD !`)
            this.team = this.team.filter(item => item !== player)
        }   
    }

    //manage monsters turn
    private monstersTurn(monster: Character): void {
        console.log('\x1b[31m%s\x1b[0m',`TURN OF ----> ${monster.name.toUpperCase()}(${monster.currentHP}HP)\n`);
        if (monster instanceof Monstre){
            const targetIndex = Math.floor(Math.random() * this.team.length);
            const target = this.team[targetIndex];
            const damage = monster.physicAttack - target.physicDefence;
            target.loseHP(damage);
            console.log('\x1b[31m%s\x1b[0m',`${monster.name.toUpperCase()} ATTACKS ${target.name.toUpperCase()} FOR ${damage} DAMAGE!\n`);
            pause(3000);
        } else {
            const actionChance = Math.floor(Math.random() * 100);
            if(actionChance <= 70){
                const targetIndex = Math.floor(Math.random() * this.team.length);
                const target = this.team[targetIndex];
                const damage = monster.physicAttack - target.physicDefence;
                target.loseHP(damage);
                console.log('\x1b[31m%s\x1b[0m',`${monster.name.toUpperCase()} ATTACKS ${target.name.toUpperCase()} FOR ${damage} DAMAGE!\n`);
                pause(3000);
            } else {
                console.log('\x1b[31m%s\x1b[0m',`${monster.name.toUpperCase()} USES END OF THE WORD ! BEWARE !!!`)
                pause(5000);
                if (monster instanceof Boss) {
                    monster.specialAttack(this.team);
                }        
            }
        }    
    }

    //method for simple attack
    private attack(attacker: Character): void {
        console.log(`SELECT TARGET FOR ${attacker.name.toUpperCase()}: \n`);
        this.monsters.forEach((monster, index) => {
            console.log(`${index + 1}. ${monster.name} (${monster.currentHP} HP)`);   
        });
        const targetIndex = parseInt((prompt("\nTARGET: ")) || '0') - 1;
        console.clear()
        if (!isNaN(targetIndex) && targetIndex >= 0 && targetIndex < this.monsters.length) {
            const target = this.monsters[targetIndex];
            const damage = attacker.physicAttack - target.physicDefence;
            target.loseHP(damage);
            console.log('\x1b[32m%s\x1b[0m',`${attacker.name.toUpperCase()} ATTACKS ${target.name.toUpperCase()} FOR ${damage} DAMAGE!`)
            pause(2000);
            if(target.currentHP <= 0) {
                console.log(`${target.name} IS DEAD.`)
                pause(4000);
                this.monsters = this.monsters.filter(item => item !== target)
            }
        } else {
            console.log("\nINVALID TARGET !    TURN SKIPPED !");
            pause(2000);
        }
        console.clear()
    }

    //method to manage items use
    private useItem(user: Character): void {
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

    private usePotion(user: Character): void {
        if (user.currentHP > 0){
            const healAmount = Math.floor(user.maxHP * 0.5);
            user.gainHP(healAmount);
            console.log(`//////////${user.name} USES POTION AND HEALS FOR ${healAmount} HP.`);
            pause(3000);
        } else {
            console.log(`BRO, YOU ARE DEAD YOU CAN ONLY USE STARPIECE OR MIDSTAR TO RESURECT`);
            pause(5000);
            console.log(`YOU LOSE POTION ! TURN SKIPPED`);
            pause(3000);
        }  
    }

    private useStarPiece(user: Character): void {
        const restoreAmount = Math.floor(user.maxHP * 0.2);
        const healAmount2 = Math.floor(user.maxHP * 0.5);
        if(user.currentHP <= 0 ){
            console.log(`//////////${user.name.toUpperCase()} USES STARPIECE TO RESURECT AND GAIN ${restoreAmount} % OF HIS HP !`);
            user.gainHP(restoreAmount)
            pause(2000);
        } else {
            user.gainHP(healAmount2)
            console.log(`//////////${user.name} USES STARPIECE AND GAIN ${healAmount2} % OF HIS HP !`)
            pause(2000);
        }
    }

    private useMidStar(user: Character): void {
        const restoreAmount2 = user.maxHP;
        const healAmount3 = user.maxHP - user.currentHP;
        if(user.currentHP <= 0 ){
            console.log(`//////////${user.name} USES MIDSTAR TO RESURECT WITH HIS FULL HP !`);
            user.gainHP(restoreAmount2)
            pause(2000);
        } else {
            user.gainHP(healAmount3)
            console.log(`//////////${user.name.toUpperCase()} USES STARPIECE AND RECOVER HIS FULL HP !`)
            pause(2000);
        }
    }

    private useEther(user: Character): void {
        user.mana += 30;
        console.log(`//////////${user.name.toUpperCase()} USES ETHER !\n`)
        pause(3000);
        console.log(`CURRENT MANA OF ${user.name.toUpperCase()} = ${user.mana} !`)
        pause(3000);
    }

    public teamIsAlive(): boolean {
        if(this.team.length !== 0){
            return true;
        } else {
            return false;
        }
    }

    public monstersAreAlive(): boolean {
        if(this.monsters.length !== 0){
            return true;
        } else {
            return false;
        }
    }

    //method for rooms without monsters
    public treatmentAfterRoom(damage : number, item : string): void {
        if(item === "DANGER !!! SNAKES"){
            this.team.forEach(member => {
                member.currentHP = member.currentHP - damage;
                console.log(`${member.name.toUpperCase()} LOSE ${damage}HP ! --- CURRENT HP:${member.currentHP}`)
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