export default class Inventory {
    private _items: string[];

    constructor() {
        this._items = ["Potion", "StarPiece", "MidStar", "Ether"];
    }

    get items(): string[] {
        return this._items;
    }

    set items(items: string[]) {
        this._items = items;
    }

/*methods to manipulate items. */

    public addItem(item: string): void {
        this._items.push(item);
    }

    public removeItem(item: string): void {
        const index = this._items.indexOf(item);
        if (index !== -1) {
            this._items.splice(index, 1);
        }
    }

    public showItems(): void {
        this._items.forEach(item => console.log("- " + item));
    }
}