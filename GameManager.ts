import Character from "./classes/Character.ts";
import Room from "./Room.ts";

export function pause(milliseconds: number) {
    const date = Date.now();
    let currentDate: number;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

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
        console.log("STARTING THE GAME---------------");
        pause(2000);
        console.clear()
        while (this.currentRoomIndex < this.rooms.length && this.teamIsAlive()) {
            const currentRoom = this.rooms[this.currentRoomIndex];
            console.log(`----------------------------------------------------------------------------------\\\\\\-ROOM ${this.currentRoomIndex + 1}-///---------------------------------------------------------------------------------\n`);
            pause(2000)
            currentRoom.enterRoom(this.team);
            if (this.teamIsAlive()) {
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
        return this.team.length !== 0;
    }
}

export default GameManager;
