import Character from "./Character.ts";

class Barbare extends Character {
    constructor(nom: string) {
        super(nom, 25, 10, 8, 110, 110);
    }

    attaqueBerserk(adversaire: Character): void {
        console.log(`Select target for Barbare:`);
        const targetIndex = parseInt(prompt("Choose target: ")) - 1;
        if (targetIndex >= 0) {
            const target = adversaire[targetIndex];
            const degats = Math.floor((this.attaquePhysique - adversaire.defensePhysique) * 1.3);
            adversaire.perdreVie(degats);
            console.log(`Barbare attacks ${target} for ${degats} damage!`);
            const blessure = Math.floor(this.pointsDeVieMax * 0.2);
            this.perdreVie(blessure);
            console.log(`Barbare perds ${blessure}HP`)
        } else {
            console.log("Invalid target. Turn skipped.");
        }
    }
}

export default Barbare;
