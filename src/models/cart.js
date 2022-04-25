class Cart {
    constructor() {
        this.items = {};
        this.totalPrice = 0;
        this.itemQty = 0;
    }

    addItem(item, qty) {
        if (!(item.itemId in this.items)) {
            this.items[item.itemId] = { ...item, qty };
            this.itemQty++;
        } else {
            this.items[item.itemId].qty += qty;
        }
        this.totalPrice += item.price * qty;
    }

    removeItem(itemId) {
        if (itemId in this.items) {
            delete this.items.itemId;
        }
    }
}

export default Cart;
