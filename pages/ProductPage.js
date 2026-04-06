class ProductPage {
    constructor(page) {
        this.page = page;

        // Localizamos el contenedor de cada producto
        this.itemCard = page.locator('.inventory_item');
        // Localizamos los botones de añadir (usando ^= que seleccionara todo lo que comience con lo que indiquemos)
        this.addButtons = page.locator('[data-test^="add-to-cart"]'); 
        // Localizamos el contador del carrito
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
         // Localizamos un producto específico
        this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        // Localizamos el contentedor desplegable del filtro
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        // Localizamos el contenido del precio en el inventario
        this.inventoryPrices = page.locator('[data-test="inventory-item-price"]');
        // Localizamos el contenido del nombre en el inventario
        this.inventoryName = page.locator('[data-test="inventory-item-name"]');

}
    // Funcion/Método para cambiar el filtro
    async selectSortOrder(option) {
        await this.sortDropdown.selectOption(option);
    }

    async agregarPrimerProducto() {
        // Usamos 'this' para acceder a la propiedad de la clase
        await this.addButtons.first().click();
    }
}
module.exports = { ProductPage };

