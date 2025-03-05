class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = 1; 
    }
}

class Cart {
    constructor() {
        this.items = {};
        this.totalPrice = 0;
    }

    addItem(product) {
        if (this.items[product.id]) {
            this.items[product.id].quantity += 1; 
        } else {
            this.items[product.id] = product; 
        }
        this.displayCart();
    }

    removeItem(productId) {
        if (this.items[productId]) {
            this.items[productId].quantity -= 1; 
            if (this.items[productId].quantity <= 0) {
                delete this.items[productId]; 
            }
            this.displayCart();
        }
    }

    displayCart() {
        const cartItemsDiv = document.getElementById('cart-items');
        cartItemsDiv.innerHTML = '';
        this.totalPrice = 0; 

        for (const key in this.items) {
            const item = this.items[key];
            if (item.quantity > 0) {
                const itemDiv = document.createElement('div');
                itemDiv.textContent = `${item.name} (${item.quantity})`;
                itemDiv.style.cursor = 'pointer'; 
                itemDiv.addEventListener('click', () => this.removeItem(item.id)); 
                cartItemsDiv.appendChild(itemDiv);
                this.totalPrice += item.price * item.quantity; 
            }
        }

        document.getElementById('total-price').textContent = `Total: ₹${this.totalPrice.toFixed(2)}`;
    }
}

const cart = new Cart();

document.querySelectorAll('.sm-button').forEach(button => {
    button.addEventListener('click', () => {
        const product = new Product(
            button.getAttribute('data-id'),
            button.getAttribute('data-name'),
            parseFloat(button.getAttribute('data-price')),
            button.previousElementSibling.src
        );
        cart.addItem(product);
    });
});

const clearCart = document.getElementById("clearCart");
clearCart.onclick = function() {
    let val = window.confirm("Are you sure you wish to delete all cart items?");
    if (val) {
        cart.items = {};
        cart.totalPrice = 0;
        cart.displayCart();
    }
}