const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const customerData = require('../data/customerData.json');
const userList = require('../data/usersList.json');

for (const usuario of userList) {
    test(`Compra completa con usuario: ${usuario.username}`, async ({ page }) => {
        const login = new LoginPage(page);
        const checkout = new CheckoutPage(page);
        const cart = new CartPage(page);
        const products = new ProductPage(page);

        await login.navegar();
        await login.iniciarSesion(usuario.username, usuario.password);
        //Resultado del login si pasa o no
        await expect(page).toHaveURL(/inventory.html/);

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
        await checkout.completarFormulario(customerData.customer.firstName, customerData.customer.lastName, customerData.customer.postalCode); 
        
        await checkout.finalizarCompra();

        // ¿Cómo verificarías que el mensaje final es 'Thank you for your order!'?
        await expect(checkout.successMessage).toHaveText('Thank you for your order!');
});
}
