import { pause } from "../GameManager.ts";
import Character from "./Character.ts";
import { pause } from "../GameManager.ts";
import SpecialAttack from "./SpecialAttack.ts";

class Pretre extends Character implements SpecialAttack {
class Pretre extends Character implements SpecialAttack {
    constructor(nom: string) {
        super(nom, 15, 8, 15, 70, 70, 90);
        super(nom, 15, 8, 15, 70, 70, 90);
    }

    attaqueSpecial(adversaire: Character[]): void {
        let recuperation: number 
        for (let i of adversaire){
            recuperation = Math.floor(i.pointsDeVieMax * 0.25)
            let recuperation2 = i.pointsDeVieMax - i.pointsDeVieCourants
            i.pointsDeVieCourants += recuperation
            if (i.pointsDeVieCourants >= i.pointsDeVieMax) {
                i.pointsDeVieCourants = i.pointsDeVieMax
                console.log(` ${i.nom.toUpperCase()} RECOVERS ${recuperation2} HP ! HIS LIFE IS ${i.pointsDeVieCourants}` )
                pause(3000)
            } else if (i.pointsDeVieCourants <= 0){
                i.pointsDeVieCourants = 0
                console.log(`IMPOSSIBLE BECAUSE ${i.nom.toUpperCase()} IS DEAD`)
                pause(3000)
            } else{
                console.log(` ${i.nom.toUpperCase()} RECOVERS ${recuperation} HP! HIS LIFE IS ${i.pointsDeVieCourants}`)
                pause(3000)
            }
            
        }           
    }
}

export default Pretre;
