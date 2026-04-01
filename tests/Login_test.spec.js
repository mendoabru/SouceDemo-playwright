const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Login exitoso en SauceDemo', async ({ page }) => {
    // 1. Arrange (Organizar)
    const login = new LoginPage(page);
    await login.navegar();

    // 2. Act (Actuar)
    await login.iniciarSesion('standard_user', 'secret_sauce');

    // 3. Assert (Confirmar)
    // Verificamos que entramos a la página de productos
    await expect(page).toHaveURL(/inventory.html/);
});