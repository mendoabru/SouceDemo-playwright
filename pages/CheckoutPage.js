class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.successMessage = page.locator('.complete-header');
    }

    async completarFormulario(nombre, apellido, cp) {
        await this.firstName.fill(nombre);
        await this.lastName.fill(apellido);
        await this.postalCode.fill(cp);
        await this.continueButton.click();
    }

    async finalizarCompra() {
        await this.finishButton.click();
    }
}
module.exports = { CheckoutPage };