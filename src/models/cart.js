class Cart {
    constructor(initCart) {
        this.items = initCart.items || {};
        this.totalPrice = initCart.totalPrice || 0;
        this.itemQty = initCart.itemQty || 0;
    }

    addItem(item, qty) {
        if (!(item.itemId in this.items)) {
            this.items[item.itemId] = {
                itemId: item.itemId,
                name: item.name,
                price: item.price,
                qty,
            };
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
