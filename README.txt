***You need to clone the project locally (git clone and the link provided by Github).***


---At first, you need to launch the program using the command: deno run main.ts.
   be sure to be in the projectRPG folder.
   Then, follow the instructions displayed on the screen to play the game.

---The game is a role-playing game where the player must choose a character from three proposed characters. 
   Each character has different characteristics.

---The turn is decided by the speed of each character. Fastest to slowest.
   The player in his turn must then choose an action from three proposed actions(attack, specialAttack or useItems).

!!! Warning if you uses an illegal action the turn of the player that do it will be skipped !
    Make sure to be aware of the stats of all your characters !

---A room of monsters is cleared when all the monsters are dead(HP 0).

---Good luck ! and enjoy !


//////////CHEAT : if you want to go to any room you want, you just need to go into GameManager.ts, line 54.
                  you change 'this.currentRoomIndex' by the number of the room you want - 1. We have 5 rooms.