import Character from "./classes/Character.ts";
import Room from "./Room.ts";

class GameManager {
    team: Character[];
    rooms: Room[];
    currentRoomIndex: number;

    constructor(team: Character[], rooms: Room[]) {
        this.team = team;
        this.rooms = rooms;
        this.currentRoomIndex = 0;
    }

    startGame() {
        console.log("Welcome to the dungeon!");
        while (this.currentRoomIndex < this.rooms.length && this.teamIsAlive()) {
            const currentRoom = this.rooms[this.currentRoomIndex];
            console.log(`You entered room ${this.currentRoomIndex + 1}`);
            currentRoom.enterRoom(this.team);
            if (currentRoom.monsters.length === 0) {
                console.log("Room cleared!");
                this.currentRoomIndex++;
            }
        }
        if (!this.teamIsAlive()) {
            console.log("Your team has been defeated. Game over!");
        } else {
            console.log("Congratulations! You have cleared the dungeon!");
        }
    }

    teamIsAlive(): boolean {
        return this.team.some(member => member.pointsDeVieCourants > 0);
    }
}

export default GameManager;
