class Menu {
    perso: string[];
    persoC: string[];

    constructor(perso: string[], persoC: string[]) {
        this.perso = perso;
        this.persoC = persoC;
    }

    printPerso() {
        console.log("Voici les persos");
        for (let i = 0; i < this.perso.length; i++) {
            console.log(i + 1 + `- ${this.perso[i]}`);
        }
    }

    choice() {
        this.printPerso();

        let choix = parseInt(prompt("Choisissez un nombre entre 1 et 6 : ") || '0');

        if (isNaN(choix) || choix < 1 || choix > 6) {
            console.log("Erreur : Veuillez saisir un nombre entre 1 et 6.");
            this.choice();
        } else {
            let confirmChoice = prompt("Confirmer votre choix : 'ok', 'non'");
            if (confirmChoice === "ok") {
                this.persoC.push(this.perso[choix - 1]);
                console.log(`Vous avez choisi ${this.persoC.join(', ')}`);
            } else if (confirmChoice === "non") {
                this.choice();
            } else {
                console.log("Choisissez une option valide.");
                this.choice();
            }
        }
    }
}

const menu = new Menu(["Perso 1", "Perso 2", "Perso 3", "Perso 4", "Perso 5", "Perso 6"], []);

while (menu.persoC.length < 3) {
    menu.choice();
}
