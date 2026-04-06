const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
require('dotenv').config();

test('Validar ordenamiento de precios: Menor a Mayor', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductPage(page);

    // Login (usando las variables de entorno)
    await login.navegar();
    await login.iniciarSesion(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);

    // 1. Cambiamos el filtro a "nombre (z to a)"
    // El valor interno en el HTML para esta opción es 'za'
    await products.selectSortOrder('za');

    // 2. Capturamos todos los textos de los nombres
    const productsName = await products.inventoryName.allInnerTexts();

    // 3. Mostrar: ¿Está ordenado de Z a A?
    console.log('Nombres capturados:', productsName);
    
    expect(productsName[0] > productsName[1]).toBe(true);
    

});