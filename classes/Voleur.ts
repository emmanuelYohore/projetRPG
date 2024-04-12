import Character from "./Character.ts";
import {pause} from "../GameManager.ts";

class Voleur extends Character{
    constructor(nom: string) {
        super(nom, 18, 12, 25, 80, 80,90);
    }

    vol( monster : Character){
        const chance = Math.random() * 100;
        console.log(`CHANCE : ${chance}----LE VOLEUR VA ESSAYER DE VOLER UN OBJET`)
        pause(3000);

        if (chance < 40) {
            console.log("RIEN N'EST VOLÉ");
            pause(3000);
        } else if (chance < 70) {
            if (monster.inventory.items.includes('Potion')) {
                monster.inventory.removeItem('Potion');
                this.inventory.addItem('Potion');
                console.log("UNE POTION EST VOLÉE");
            } 
            pause(3000);
        } else if (chance < 85) {
            if (monster.inventory.items.includes('StarPiece')) {
                monster.inventory.removeItem('StarPiece');
                this.inventory.addItem('StarPiece');
                console.log("UN FRAGMENT D'ÉTOILE EST VOLÉ");
            } 
            pause(3000);
        } else if (chance < 95) {
            if (monster.inventory.items.includes('Ether')) {
                monster.inventory.removeItem('Ether');
                this.inventory.addItem('Ether');
                console.log("UN ÉTHER EST VOLÉ");
            }
            pause(3000);
        } else {
            if (monster.inventory.items.includes('MidStar')) {
                monster.inventory.removeItem('MidStar');
                this.inventory.addItem('MidStar');
                console.log("UNE DEMI-ÉTOILE EST VOLÉE");
            } 
            pause(3000);
        }
    }
}

export default Voleur;