document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');

    document.querySelectorAll('.cart-btn').forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const productBox = button.closest('.box');
            const productId = button.getAttribute('data-id');
            const productName = productBox.querySelector('.content h3').innerText;
            const productPrice = parseFloat(productBox.querySelector('.content .price').childNodes[0].nodeValue.replace('$', ''));

            const existingProduct = cart.find(item => item.id === productId);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                const product = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                };
                cart.push(product);
            }

            updateCart();
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartTotal.innerText = total.toFixed(2);
    }
});
