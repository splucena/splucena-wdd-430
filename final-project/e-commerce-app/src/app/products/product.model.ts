export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imageUrl: string,
    public price: number,
    public category: []
  ) {}
}
