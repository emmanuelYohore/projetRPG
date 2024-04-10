import Inventory from "../Inventory.ts";

class Character {
    nom: string;
    attaquePhysique: number;
    defensePhysique: number;
    vitesse: number;
    pointsDeVieMax: number;
    pointsDeVieCourants: number;
    inventory: Inventory;

    constructor(
        nom: string,
        attaquePhysique: number,
        defensePhysique: number,
        vitesse: number,
        pointsDeVieMax: number,
        pointsDeVieCourants: number
    ) {
        this.nom = nom;
        this.attaquePhysique = attaquePhysique;
        this.defensePhysique = defensePhysique;
        this.vitesse = vitesse;
        this.pointsDeVieMax = pointsDeVieMax;
        this.pointsDeVieCourants = pointsDeVieCourants;
        this.inventory = new Inventory();
    }

    attaquer(adversaire: Character): void {
        const degats = this.attaquePhysique - adversaire.defensePhysique;
        adversaire.perdreVie(degats);
    }

    perdreVie(degats: number): void {
        this.pointsDeVieCourants -= degats;
        if (this.pointsDeVieCourants < 0) {
            this.pointsDeVieCourants = 0;
        }
    }

    restaurerVie(restitution: number): void {

        this.pointsDeVieCourants += restitution;
        if (this.pointsDeVieCourants > this.pointsDeVieMax) {
            this.pointsDeVieCourants = this.pointsDeVieMax;
        }
    }

    ressusciter(pourcentage: number): void {
        this.pointsDeVieCourants = Math.floor(this.pointsDeVieMax * (pourcentage / 100));
    }
}

export default Character;
