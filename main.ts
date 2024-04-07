import GameManager from "./GameManager.ts";
import Menu from "./Menu.ts";
import Guerrier from "./classes/Guerrier.ts";
import Mage from "./classes/Mage.ts";
import Paladin from "./classes/Paladin.ts";
import Barbare from "./classes/Barbare.ts";
import Pretre from "./classes/Pretre.ts";
import Voleur from "./classes/Voleur.ts";
import Room from "./Room.ts";

// Création des personnages disponibles
const guerrier = new Guerrier("Guerrier");
const mage = new Mage("Mage");
const paladin = new Paladin("Paladin");
const barbare = new Barbare("Barbare");
const pretre = new Pretre("Prêtre");
const voleur = new Voleur("Voleur");

// Création des salles avec des monstres
const room1 = new Room([new Guerrier("Goblin"), new Guerrier("Goblin")], ["Potion"]);
const room2 = new Room([new Barbare("Orc")], ["Elixir"]);

// Menu de sélection des personnages
const menu = new Menu([guerrier, mage, paladin, barbare, pretre, voleur]);
const selectedTeam = menu.chooseCharacters();

// Démarrage du jeu avec l'équipe sélectionnée
const gameManager = new GameManager(selectedTeam, [room1, room2]);
gameManager.startGame();
