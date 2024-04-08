import GameManager from "./GameManager.ts";
import Menu from "./Menu.ts";
import Guerrier from "./classes/Guerrier.ts";
import Mage from "./classes/Mage.ts";
import Paladin from "./classes/Paladin.ts";
import Barbare from "./classes/Barbare.ts";
import Pretre from "./classes/Pretre.ts";
import Voleur from "./classes/Voleur.ts";
import Room from "./Room.ts";
import Monstre from "./classes/Monstre.ts"
import Boss from "./classes/Boss.ts"

// Création des personnages disponibles
const guerrier = new Guerrier("Guerrier");
const mage = new Mage("Mage");
const paladin = new Paladin("Paladin");
const barbare = new Barbare("Barbare");
const pretre = new Pretre("Prêtre");
const voleur = new Voleur("Voleur");

// Création des salles avec des monstres
const room1 = new Room([new Monstre("Goblin"), new Monstre("Goblin")], ["Potion"]);
const room2 = new Room([], ["Elixir"]);
const room3 = new Room([new Monstre("Ange"), new Monstre("Demon")], ["Elixir"]);
const room4 = new Room([], ["Ether"]);
const room5 = new Room([new Boss("Armageddon")], ["Ether", "Potion"]);
// Menu de sélection des personnages
const menu = new Menu([guerrier, mage, paladin, barbare, pretre, voleur]);
const selectedTeam = menu.chooseCharacters();

// Démarrage du jeu avec l'équipe sélectionnée
const gameManager = new GameManager(selectedTeam, [room1, room2, room3, room4, room5]);
gameManager.startGame();
