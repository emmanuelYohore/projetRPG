import Character from "./Character.ts";

export default class Barbare extends Character {
    constructor(nom: string) {
        super(nom, 25, 10, 8, 110, 110);
    }

    attaqueBerserk(adversaires: Character[]): void {
        // Sélectionner un ennemi au hasard
        const ennemi = adversaires[Math.floor(Math.random() * adversaires.length)];
    
        // Calculer les dégâts
        const degats = Math.floor((this.attaquePhysique - ennemi.defensePhysique) * 1.3);
    
        // Infliger les dégâts à l'adversaire
        ennemi.perdreVie(degats);
    
        // Calculer la blessure auto-infligée
        const blessure = Math.floor(this.pointsDeVieMax * 0.2);
    
        // Infliger la blessure au barbare
        this.perdreVie(blessure);
        
        console.log(`${this.nom} attacks ${ennemi.nom} for ${degats} damage!`);
        console.log(`${this.nom} takes ${blessure} damage due to Berserk!`);
    }
}
