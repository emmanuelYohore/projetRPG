const tabPerso = ["paladin","Guerrier","Mage","Barbare","Prêtre","Voleur"]
const tabOject = ["heal","resurect"]

while (true){
    console.log("1- object")
    console.log("2- perso")
    console.log("3- quit")

    let choice = prompt('Veiller choisir: ');
    
    if (choice == "1"){
        console.log(tabOject) 
    }
    else if(choice =="2"){
        console.log(tabPerso)
    }
    else if(choice =="3"){
     break
    }
    else{
        console.log("Option invalide. Veiller réesayer : ")
    }
}
