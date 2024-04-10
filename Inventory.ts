class Inventory {
    items: string[] =["Potion", "Elixir", "Ether", "Star"];

    constructor() {
        this.items = ["Potion", "StarPiece", "MidStar", "Ether"];
    }

    addItem(item: string): void {
        this.items.push(item);
    }

    removeItem(item: string): void {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    showItems(): void {;
        this.items.forEach(item => console.log("- " + item));
    }
}

export default Inventory;
