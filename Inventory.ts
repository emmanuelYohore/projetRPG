class Inventory {
    items: string[];

    constructor() {
        this.items = [];
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

    showItems(): void {
        console.log("Inventory:");
        this.items.forEach(item => console.log("- " + item));
    }
}

export default Inventory;
