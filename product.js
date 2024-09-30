const products = [
    { id: 1, name: "Smart Fridge", price: 999.99, category: "Electronics", image: "Assets/fridge.jpg" },
    { id: 2, name: "4K TV", price: 599.99, category: "Electronics", image: "Assets/4K TV.jpg" },
    { id: 3, name: "Laptop", price: 799.99, category: "Electronics", image: "Assets/Laptop.jpg" },
    { id: 4, name: "Smartphone", price: 399.99, category: "Electronics", image: "Assets/Smartphone.jpg" },
    { id: 5, name: "Coffee Maker", price: 49.99, category: "Kitchen", image: "Assets/Coffee Maker.jpg" },
    { id: 6, name: "Blender", price: 39.99, category: "Kitchen", image: "Assets/Blender.jpg" },
    { id: 7, name: "Toaster Oven", price: 59.99, category: "Kitchen", image: "Assets/Toaster Oven.jpg" },
    { id: 8, name: "Microwave", price: 89.99, category: "Kitchen", image: "Assets/Microwave.jpg" },
    { id: 9, name: "Sofa", price: 499.99, category: "Furniture", image: "Assets/Sofa.jpg" },
    { id: 10, name: "Dining Table", price: 299.99, category: "Furniture", image: "Assets/Dining Table.jpg" },
    { id: 11, name: "Bookshelf", price: 149.99, category: "Furniture", image: "Assets/Bookshelf.jpg" },
    { id: 12, name: "Bed ", price: 199.99, category: "Furniture", image: "Assets/Bed.jpg" },
    { id: 13, name: "Gaming Console", price: 399.99, category: "Gaming", image: "Assets/Gaming Console.jpg" },
    { id: 14, name: "Gaming Headset", price: 79.99, category: "Gaming", image: "Assets/Gaming Headset.jpg" },
    { id: 15, name: "Gaming Mouse", price: 49.99, category: "Gaming", image: "Assets/Gaming Mouse.jpg" },
];

let cart = [];

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function displayProducts() {
    const container = document.getElementById('products-container');
    const categories = [...new Set(products.map(product => product.category))];

    categories.forEach(category => {
        const categoryProducts = products.filter(product => product.category === category);
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');
        categoryElement.innerHTML = `
            <h3>${category}</h3>
            <div class="product-grid">
                ${categoryProducts.map(product => `
                    <div class="product-card">
                        <div class="product-image-container">
                            <img src="${product.image}" alt="${product.name}" class="product-image">
                        </div>
                        <div class="product-info">
                            <div class="product-title">${product.name}</div>
                            <div class="product-price">$${product.price.toFixed(2)}</div>
                            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(categoryElement);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    animateCartIcon();
    saveCart();
}


function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.style.display = 'inline-block';
    } else {
        cartCount.style.display = 'none';
    }
}

function animateCartIcon() {
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.style.animation = 'cartBounce 0.5s ease';
    setTimeout(() => {
        cartIcon.style.animation = 'none';
    }, 500);
}


function showCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</span>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    document.getElementById('cart-modal').style.display = 'block';
}


function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCartCount();
        showCart();
        saveCart();
    }
}

document.getElementById('cart-icon').addEventListener('click', showCart);
document.querySelector('.close').addEventListener('click', closeModal);
document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Thank you for your purchase!');
    cart = [];
    updateCartCount();
    closeModal();
    saveCart();
});

function closeModal() {
    document.getElementById('cart-modal').style.display = 'none';
}
document.getElementById('cart-icon').addEventListener('click', showCart);
document.querySelector('.close').addEventListener('click', closeModal);
document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Thank you for your purchase!');
    cart = [];
    updateCartCount();
    closeModal();
    saveCart();
});

// Initialize the page
loadCart();
updateCartCount();
displayProducts();