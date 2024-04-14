import Character from "../characters/Character.ts";
import Room from "./Room.ts";

export function pause(milliseconds: number) {
    const date = Date.now();
    let currentDate: number;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

export default class GameManager {
    private _team: Character[];
    private _rooms: Room[];
    private _currentRoomIndex: number;

    constructor(team: Character[], rooms: Room[]) {
        this._team = team;
        this._rooms = rooms;
        this._currentRoomIndex = 0;
    }

    get team(): Character[] {
        return this._team;
    }

    set team(team: Character[]) {
        this._team = team;
    }

    get rooms(): Room[] {
        return this._rooms;
    }

    set rooms(rooms: Room[]) {
        this._rooms = rooms;
    }

    get currentRoomIndex(): number {
        return this._currentRoomIndex;
    }

    set currentRoomIndex(currentRoomIndex: number) {
        this._currentRoomIndex = currentRoomIndex;
    }

    public startGame() {
        console.log("STARTING THE GAME---------------");
        pause(2000);
        console.clear();
        while (this.currentRoomIndex < this.rooms.length && this.teamIsAlive()) {
            const currentRoom = this.rooms[this.currentRoomIndex];
            console.log(`----------------------------------------------------------------------------------\\\\\\-ROOM ${this.currentRoomIndex + 1}-///---------------------------------------------------------------------------------\n`);
            pause(2000);
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

    private teamIsAlive(): boolean {
        return this.team.length !== 0;
    }
}