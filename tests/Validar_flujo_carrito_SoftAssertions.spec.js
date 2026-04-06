const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const cliente = require('../data/customerData.json');
const userList = require('../data/usersList.json');

test('Validar flujo de carrito con Soft Assertions', async ({ page }) => {
    // Iniciación
    const login = new LoginPage(page);
    const products = new ProductPage(page);


    await login.navegar();
    await login.iniciarSesion(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
    

  // 1. Verificamos que el carrito NO tenga el número al inicio
  await expect(products.cartBadge).not.toBeVisible();

  // 2. Agregamos un producto
  await products.addToCartButton.click();

  // 3. SOFT ASSERTIONS: Validamos dos cosas sin detener el test si una falla
  await expect.soft(products.cartBadge).toBeVisible();
  await expect.soft(products.cartBadge).toHaveText('99');

  console.log('Si los asserts de arriba fallan, igual verás este mensaje');
});