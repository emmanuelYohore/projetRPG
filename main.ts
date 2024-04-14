import GameManager from "./game/GameManager.ts";
import Menu from "./game/Menu.ts";
import Guerrier from "./characters/Guerrier.ts";
import Mage from "./characters/Mage.ts";
import Paladin from "./characters/Paladin.ts";
import Barbare from "./characters/Barbare.ts";
import Pretre from "./characters/Pretre.ts";
import Voleur from "./characters/Voleur.ts";
import Room from "./game/Room.ts";
import Monstre from "./characters/Monstre.ts"
import Boss from "./characters/Boss.ts"

//initialisation des personnages
const guerrier = new Guerrier("Guerrier");
const mage = new Mage("Mage");
const paladin = new Paladin("Paladin");
const barbare = new Barbare("Barbare");
const pretre = new Pretre("Prêtre");
const voleur = new Voleur("Voleur");

//initialisation des salles
const room1 = new Room([new Monstre("Goblin1"), new Monstre("Goblin2")], []);
const room2 = new Room([], ["Potion","StarPiece","DANGER !!! SNAKES"]);
const room3 = new Room([new Monstre("Ange"), new Monstre("Demon")], []);
const room4 = new Room([], ["Ether", "Potion", "DANGER !!! SNAKES"]);
const room5 = new Room([new Boss("Armageddon")], []);

//lancement de la partie
console.clear()
const menu = new Menu([guerrier, mage, paladin, barbare, pretre, voleur]);
const selectedTeam = menu.chooseCharacters();
const gameManager = new GameManager(selectedTeam, [room1, room2, room3, room4, room5]);
gameManager.startGame();