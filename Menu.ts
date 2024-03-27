
import Character from "./Character.ts"

class Menu extends Character {

    tabPerso : string[] 
    tabOject: string[]
    constructor() {
        super("yyy",14,45,47,12,45); 
        this.tabPerso = ["paladin", "Guerrier", "Mage", "Barbare", "Prêtre", "Voleur"];
        this.tabOject = ["heal", "resurect"];
    }

    afficherMenu() {
        console.log("1- object");
        console.log("2- perso");
        console.log("3- quit");
    }

    choixUtilisateur() {

        while (true){
            let choice = prompt('Veiller choisir: ');
    
            if (choice == "1"){
            console.log(this.tabOject);
              }
              else if(choice =="2"){
            console.log(this.tabPerso);
             }
              else if(choice =="3"){
                return false;
            }
              else{
            console.log("Option invalide. Veiller réesayer : ");
             }
       }
       
        
    }

    demarrer() {
        while (true) {
            this.afficherMenu();
            if (!this.choixUtilisateur()) {
                break;
            }
        }
    }
}


const menu = new Menu();
menu.demarrer();