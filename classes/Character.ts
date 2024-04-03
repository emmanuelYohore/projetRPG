class Character {
    constructor(
        public nom: string,
        public attaquePhysique: number,
        public defensePhysique: number,
        public vitesse: number,
        public pointsDeVieMax: number,
        public pointsDeVieCourants: number
    ) {}

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

    restaurerVie(pourcentage: number): void {
        const pvRestaurés = Math.floor(this.pointsDeVieMax * (pourcentage / 100));
        this.pointsDeVieCourants += pvRestaurés;
        if (this.pointsDeVieCourants > this.pointsDeVieMax) {
            this.pointsDeVieCourants = this.pointsDeVieMax;
        }
    }

    ressusciter(pourcentage: number): void {
        this.pointsDeVieCourants = Math.floor(this.pointsDeVieMax * (pourcentage / 100));
    }
}

export default Character;
