class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async verificarProductosAgregados() {
        // FUNDAMENTO: Aquí usamos una aserción de lista
        return this.cartItems;
    }

    async irAlCarrito() {
    await this.cartLink.click();
    }

    async irAlCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };