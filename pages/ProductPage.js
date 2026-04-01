class ProductPage {
    constructor(page) {
        this.page = page;
        // Localizamos el contenedor de cada producto
        this.itemCard = page.locator('.inventory_item');
        // Localizamos los botones de añadir (usando el atributo que mencionaste)
        this.addButtons = page.locator('[data-test^="add-to-cart"]'); 
    }

    async agregarPrimerProducto() {
        // Usamos 'this' para acceder a la propiedad de la clase
        await this.addButtons.first().click();
    }
}
module.exports = { ProductPage };

