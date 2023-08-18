import { faker } from "@faker-js/faker/locale/es";


export const generateProduct = () => {

    return {
    id: faker.database.mongodbObjectId(),
    code: faker.string.alphanumeric(8),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.float({min:1,max:300,precision:0.01}),
    category: faker.commerce.department(),
    stock: faker.number.int({ min: 0, max: 100 }),
    thumbnails: [faker.image.url()]
  };
};