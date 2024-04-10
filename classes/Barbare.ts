import Character from "./Character.ts";

export default class Barbare extends Character {
    constructor(nom: string) {
        super(nom, 25, 10, 8, 110, 110);
    }

    attaqueBerserk(adversaires: Character[]): void {
        
        const ennemi = adversaires[Math.floor(Math.random() * adversaires.length)];
        const degats = Math.floor((this.attaquePhysique - ennemi.defensePhysique) * 1.3);
    
        
        ennemi.perdreVie(degats);
        const blessure = Math.floor(this.pointsDeVieMax * 0.2);
        this.perdreVie(blessure);
        
        console.log(`${this.nom} attacks ${ennemi.nom} for ${degats} damage!`);
        console.log(`${this.nom} takes ${blessure} damage due to Berserk!`);
    }
}
