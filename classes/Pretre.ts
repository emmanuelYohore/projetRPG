import Character from "./Character.ts";

class Pretre extends Character {
    constructor(nom: string) {
        super(nom, 15, 8, 15, 70, 70,90);
    }

    soin(ally: Character): void {
        const soin = Math.floor(ally.pointsDeVieMax * 0.25);
        ally.restaurerVie(soin);
    }
}

export default Pretre;