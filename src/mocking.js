import { faker } from "@faker-js/faker";
  let random_boolean = Math.random() < 0.5;
export class ProductsMock {
    constructor(){}
  
    productWithId = () => {
        const product = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price({min: 100, max: 3500}),
            status: random_boolean,
            code: faker.number.int(),
            stock: faker.number.int(),
            category: faker.commerce.department(),
            thumbnails: [faker.image.url({width: 200, height: 200})],
            _id: faker.database.mongodbObjectId(),
            
        };
        
        return product;
    }

    product = () => {
        const product = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price({min: 100, max: 3500}),
            status: random_boolean,
            code: faker.number.int(),
            stock: faker.number.int(),
            category: faker.commerce.department(),
            thumbnails: [faker.image.url({width: 200, height: 200})]
        };
        
        return product;
    }
}