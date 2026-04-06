const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const customerData = require('../data/customerData.json');


test(`Flujo de compra completa con usuario:' ${customerData.customer.firstName}`, async ({ page }) => {
    
    const login = new LoginPage(page);
    const checkout = new CheckoutPage(page);
    const cart = new CartPage(page);
    const products = new ProductPage(page);
    
    //Iniciamos login
    await login.navegar();
    await login.iniciarSesion(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);

    //Resultado del login si pasa o no
    await expect(page).toHaveURL(/inventory.html/);

    // Agregamos solo los 3 primeros productos al carrito
    for (let i = 0; i < 3; i++) {
    await products.addButtons.nth(i).click();
    }
    // Clic al icono del carrito
    await cart.irAlCarrito(); 

    // Controlamos el carrito que contenga 3 artículos y click al CheckOut
    await expect(cart.cartItems).toHaveCount(3);
    await cart.irAlCheckout();

    // Rellenamos el formulario con los datos del cliente
    await checkout.completarFormulario(customerData.customer.firstName, customerData.customer.lastName, customerData.customer.postalCode); 
        
    //Verificamos que estamos en la página de resumen
    await expect.soft(page).toHaveURL(/checkout-step-two/);
    await checkout.finalizarCompra();

    // Verificamos que el mensaje final es 'Thank you for your order!'
    await expect(checkout.successMessage).toHaveText('Thank you for your order!');
});

