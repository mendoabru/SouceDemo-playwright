class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    async navegar() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async iniciarSesion(usuario, password) {
        await this.usernameInput.fill(usuario);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
module.exports = { LoginPage };