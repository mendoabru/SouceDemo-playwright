const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const cliente = require('../data/customerData.json');
const userList = require('../data/usersList.json');

test('Flujo completo de compra exitosa', async ({ page }) => {
    // Arrange
    const login = new LoginPage(page);
    const products = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.navegar();
    await login.iniciarSesion(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
    

    // Act
    // Supongamos que queremos agregar solo los 3 primeros
    for (let i = 0; i < 3; i++) {
        await products.addButtons.nth(i).click();
    }
    
    await cart.irAlCarrito(); // Clic al icono del carrito

    // Assert & Finalize
    await expect(cart.cartItems).toHaveCount(3);
    await cart.irAlCheckout();

    // ¿Cómo llamarías al método para completar el formulario con tus datos?
    await checkout.completarFormulario(cliente.customer.firstName, cliente.customer.lastName, cliente.customer.postalCode); 
    
    await checkout.finalizarCompra();

    // ¿Cómo verificarías que el mensaje final es 'Thank you for your order!'?
    await expect(checkout.successMessage).toHaveText('Thank you for your order!');
});
