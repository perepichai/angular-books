export class CarEntity {
    id?: number | null;
    number: string;
    manufacturer: string;
    model: string;
    productionYear: string;

    constructor(number: string, manufacturer: string, model: string, productionYear: string, id?: number | null) {
        this.id = id;
        this.number = number;
        this.manufacturer = manufacturer;
        this.model = model;
        this.productionYear = productionYear;
    }
}
