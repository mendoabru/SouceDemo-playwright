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

    // 1. Cambiamos el filtro a "Price (low to high)"
    // El valor interno en el HTML para esta opción es 'lohi'
    await products.selectSortOrder('lohi');

    // 2. Capturamos todos los textos de los precios
    const pricesText = await products.inventoryPrices.allInnerTexts();

    // 3. Convertimos los textos ["$7.99", "$9.99"] en números [7.99, 9.99]
    const pricesNumbers = pricesText.map(p => parseFloat(p.replace('$', '')));

    // 4. Mostrar: ¿El primero es menor al segundo?
    console.log('Precios capturados:', pricesNumbers);
    
    expect(pricesNumbers[0]).toBeLessThanOrEqual(pricesNumbers[1]);
    
    // Extra: Validar que toda la lista esté ordenada
    const sortedPrices = [...pricesNumbers].sort((a, b) => a - b);
    expect(pricesNumbers).toEqual(sortedPrices);
});